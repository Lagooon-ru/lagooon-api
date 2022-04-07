import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  decryptString,
  encryptString,
} from '../../helper/bcrypt/bcrypt.helper';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user.entity';
import { RegisterDto } from './types/register.type';
import { TLogin } from './types/login.type';
import { MailService } from '../../service/mail/mail.service';
import { createToken } from '../../helper/token.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //Signup Service
  async signupService(dat: RegisterDto): Promise<TLogin> {
    console.log(dat);
    const pwd = encryptString(dat.password);
    const token = createToken();

    const user: User = await this.userService.createUserService({
      ...dat,
      password: pwd,
      vToken: token,
    });
    await this.mailService.sendUserConfirmationMail(user, token);
    return this.loginService(user);
  }

  //Login Service
  async loginService(user: User): Promise<TLogin> {
    const payload = {
      email: user.email,
      sub: user.password,
    };

    return {
      user: {
        ...user,
        password: undefined,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  //Forget password Email service
  async forgetPasswordService({ email }: { email: string }): Promise<boolean> {
    const user = await this.userService.getUserByAttrService({ email: email });
    const token: string = createToken();

    if (!user) {
      throw new HttpException('unregistered', HttpStatus.BAD_REQUEST);
    }

    await this.userService.updateUserService(user.id, { vToken: token });
    return this.mailService.sendForgetPasswordMail(user, token);
  }

  //Reset Password with new password service
  async resetPasswordService(user: User, password: string) {
    const pwd = encryptString(password);
    return this.userService.updateUserService(user.id, { password: pwd });
  }

  //Validate Token service *** Very important!!! Todo: security upgrade
  async validateTokenService(token: string): Promise<TLogin> {
    const user = await this.userService.getUserByAttrService({ vToken: token });
    if (!!user.id) {
      await this.userService.updateUserService(user.id, {
        vToken: createToken(),
      });
    }
    return this.loginService(user);
  }

  //initial validation for the local passport
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByAttrService({ email: email });
    if (!user) {
      return null;
    }
    const passwordIsValid = decryptString(password, user.password);
    return passwordIsValid ? user : null;
  }
}
