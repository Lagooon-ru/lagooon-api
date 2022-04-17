import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser, GqlAuthGuard, GRes } from './guards/graphql.guard';
import { RegisterDto } from './types/register.type';
import { LoginDto, TForget, TLogin, TLogout } from './types/login.type';
import { UserEntity } from '../../core/user/user.entity';
import { ResetPassDto } from './types/reset.type';
import { ProfileDto } from './types/profile.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: UserEntity) {
    return this.authService.getProfile(user.id);
  }

  @Mutation(() => TLogin)
  async signup(@GRes() res: any, @Args('arg') signupData: RegisterDto) {
    const user = await this.authService.validateUserService({
      email: signupData.email,
    });
    if (!user) {
      const re = await this.authService.signupService(signupData);
      res.cookie('token', re.access_token);
      return re;
    }

    throw new BadRequestException('This email address is already exist');
  }

  @Mutation(() => TForget)
  async emailConfirm(@Args('email') email: string) {
    const user = await this.authService.validateUserService({ email: email });

    if (!!user) {
      return this.authService.emailConfirmEmailService(user);
    }

    throw new BadRequestException('This email address is not registered.');
  }

  @Mutation(() => TLogin)
  async login(@GRes() res: any, @Args('arg') loginData: LoginDto) {
    const guard = await this.authService.validate(loginData);
    if (!!guard) {
      const re = await this.authService.loginService(guard);
      res.cookie('token', re.access_token);
      return re;
    }

    throw new UnauthorizedException('login info invalid.');
  }

  @Mutation(() => TLogout)
  async logout(@GRes() res: any) {
    res.cookie('token', '', { expires: new Date() });
    return true;
  }

  @Mutation(() => TForget)
  async forget(@Args('email') email: string) {
    const user = await this.authService.validateUserService({ email: email });

    if (!!user) {
      return this.authService.forgetPasswordService(user);
    }

    throw new BadRequestException('This email address is not registered.');
  }

  @Mutation(() => UserEntity)
  async resetPassword(@Args('arg') arg: ResetPassDto) {
    const user = await this.authService.validateUserService({
      vToken: arg.token,
    });

    if (!user) {
      throw new BadRequestException('invalid token.');
    }

    return this.authService.resetPasswordService(user, arg.password);
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async profileUpdate(
    @Args('arg') data: ProfileDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.authService.updateProfile(user, data);
  }
}
