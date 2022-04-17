import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { CloudinaryModule } from '../../service/cloudinary/cloudinary.module';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity]),
    CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage(), // use memory storage for having the buffer
    }),
  ],
  providers: [MediaService, MediaResolver],
  controllers: [MediaController],
})
export class MediaModule {}
