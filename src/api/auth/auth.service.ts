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
import { ProfileDto } from './types/profile.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getProfile(id: string): Promise<UserEntity> {
    return this.userService.getProfileService(id);
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

  async emailConfirmEmailService(user: UserEntity): Promise<any> {
    const newToken = createToken();
    await this.userService.updateUserService(user.id, { vToken: newToken });
    return this.mailService
      .sendUserConfirmationMail(user, newToken)
      .then(() => {
        return { status: true };
      })
      .catch((e) => {
        console.log(e);
        return { status: false };
      });
  }

  async emailConfirmService(token: string): Promise<boolean> {
    const user = await this.userService.getUserByAttrService({ vToken: token });
    if (!user) {
      return false;
    }

    const newToken = createToken();
    return this.userService.updateUserService(user.id, {
      vToken: newToken,
      emailConfirmed: true,
    });
  }

  //Profile Service
  async updateProfile(user: UserEntity, data: ProfileDto): Promise<UserEntity> {
    return this.userService.updateUserService(user.id, data);
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
  async forgetPasswordService(user: UserEntity): Promise<any> {
    const token: string = createToken();

    if (!user) {
      throw new HttpException('unregistered', HttpStatus.BAD_REQUEST);
    }

    await this.userService.updateUserService(user.id, { vToken: token });
    return this.mailService
      .sendForgetPasswordMail(user, token)
      .then(() => {
        return { status: true };
      })
      .catch((e) => {
        console.log(e);
        return { status: false };
      });
  }

  //Reset Password with new password service
  async resetPasswordService(user: UserEntity, password: string) {
    const pwd = encryptString(password);
    const newToken = createToken();
    return this.userService.updateUserService(user.id, {
      password: pwd,
      vToken: newToken,
    });
  }

  async resetViewService(token: string): Promise<any> {
    const user = await this.userService.getUserByAttrService({ vToken: token });
    if (!!user) {
      return { valid: true, user: user, token: token };
    } else {
      return { valid: false };
    }
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
    let u = await this.userService.getUserByAttrService({
      email: dat.user,
    });
    if (!u) {
      u = await this.userService.getUserByAttrService({
        username: dat.user,
      });
      if (!u) {
        return null;
      }
    }
    const passwordIsValid = decryptString(dat.password, u.password);
    return passwordIsValid ? u : null;
  }

  async validateUserService(arg: any): Promise<UserEntity | null> {
    return await this.userService.getUserByAttrService({ ...arg });
  }
}
