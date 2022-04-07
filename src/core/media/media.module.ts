import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaResolver]
})
export class MediaModule {}
