import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';
import { UserModule } from '../../core/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailService } from '../../service/mail/mail.service';
import { AuthResolver } from './auth.resolver';
import { MediaModule } from '../../core/media/media.module';

@Module({
  imports: [
    UserModule,
    MediaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService, AuthResolver],
})
export class AuthModule {}
