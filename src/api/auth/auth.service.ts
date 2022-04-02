import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  decryptString,
  encryptString,
} from '../../helper/bcrypt/bcrypt.helper';
import { UserService } from '../../core/user/user.service';
import { User } from '../../model/user.entity';
import { RegisterDto } from './types/register.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByAttrService({ email: email });
    if (!user) {
      return null;
    }
    const passwordIsValid = decryptString(password, user.password);
    return passwordIsValid ? user : null;
  }

  async signupService(dat: RegisterDto): Promise<User> {
    console.log(dat);
    const pwd = encryptString(dat.password);
    console.log(dat);

    return this.userService.createUserService({ ...dat, password: pwd });
    // return this.loginService();
  }

  async loginService(user: User) {
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
}
