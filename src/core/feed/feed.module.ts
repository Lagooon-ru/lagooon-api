import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedResolver } from './feed.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from '../media/media.module';
import { FeedCommentEntity, FeedEntity } from './feed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedEntity]),
    TypeOrmModule.forFeature([FeedCommentEntity]),
    MediaModule,
  ],
  providers: [FeedService, FeedResolver],
})
export class FeedModule {}
