import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './service/mail/mail.module';
import { FirebaseModule } from './service/firebase/firebase.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    MailModule,
    FirebaseModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
