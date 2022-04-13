import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [MediaService, MediaResolver],
})
export class MediaModule {}
