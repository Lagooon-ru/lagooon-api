import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { CloudinaryModule } from '../../service/cloudinary/cloudinary.module';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity]),
    CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage(), // use memory storage for having the buffer
    }),
    HttpModule,
  ],
  providers: [MediaService, MediaResolver],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
