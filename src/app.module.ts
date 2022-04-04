import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config.service';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './service/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
