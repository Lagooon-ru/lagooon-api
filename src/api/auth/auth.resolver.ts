import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from '../../core/user/user.entity';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from './guards/graphql.guard';
import { RegisterDto } from './types/register.type';
import { LoginDto, TLogin } from './types/login.type';

function LocalAuthGuard() {}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: UserEntity) {
    return this.authService.getProfile(user.id);
  }

  @Mutation(() => TLogin)
  async signup(@Args('arg') signupData: RegisterDto) {
    const user = await this.authService.validateUserService({
      email: signupData.email,
    });
    if (!user) {
      return this.authService.signupService(signupData);
    } else {
      throw new BadRequestException('This email address is already exist');
    }
  }

  @Mutation(() => TLogin)
  @UseGuards(LocalAuthGuard)
  async login(@Args('arg') loginData: LoginDto) {
    const guard = await this.authService.validate(loginData);
    if (!!guard) {
      return this.authService.loginService(guard);
    } else {
      throw new UnauthorizedException('login info invalid.');
    }
  }
}
