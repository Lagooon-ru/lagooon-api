import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
