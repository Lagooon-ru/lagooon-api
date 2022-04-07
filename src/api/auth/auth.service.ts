import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  decryptString,
  encryptString,
} from '../../helper/bcrypt/bcrypt.helper';
import { UserService } from '../../core/user/user.service';
import { UserEntity } from '../../core/user/user.entity';
import { LoginDto, TLogin } from './types/login.type';
import { MailService } from '../../service/mail/mail.service';
import { createToken } from '../../helper/token.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getProfile(id: string): Promise<UserEntity> {
    return this.userService.getUserByAttrService({ id: id });
  }

  //Signup Service
  async signupService(dat: any): Promise<TLogin> {
    const pwd = encryptString(dat.password);
    const token = createToken();

    const user: UserEntity = await this.userService.createUserService({
      ...dat,
      password: pwd,
      vToken: token,
    });

    try {
      await this.mailService.sendUserConfirmationMail(user, token);
    } catch (e) {
      console.log(e);
      throw new HttpException('Email send failed', 409);
    }

    return this.loginService(user);
  }

  //Login Service
  async loginService(user: UserEntity): Promise<TLogin> {
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
  async resetPasswordService(user: UserEntity, password: string) {
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
  async validate(dat: LoginDto): Promise<any> {
    const user = await this.userService.getUserByAttrService({
      email: dat.email,
    });
    if (!user) {
      return null;
    }
    const passwordIsValid = decryptString(dat.password, user.password);
    return passwordIsValid ? user : null;
  }

  async validateUserService(arg: any): Promise<UserEntity | null> {
    return await this.userService.getUserByAttrService({ ...arg });
  }
}
