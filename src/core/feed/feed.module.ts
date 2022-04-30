import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedResolver } from './feed.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from '../media/media.module';
import { FeedCommentEntity, FeedEntity } from './feed.entity';
import { FeedRepository } from './feed.repository';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedRepository]),
    TypeOrmModule.forFeature([FeedCommentEntity]),
    MediaModule,
    PostModule,
  ],
  providers: [FeedService, FeedResolver],
})
export class FeedModule {}
