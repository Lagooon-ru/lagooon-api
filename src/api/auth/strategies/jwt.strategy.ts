import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../core/user/user.service';
import { jwtSecret } from '../constants';
import { UserEntity } from '../../../core/user/user.entity';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    console.log();
    if (!!req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<UserEntity | null> {
    return this.userService.getUserByAttrService({
      email: validationPayload.email,
    });
  }
}
