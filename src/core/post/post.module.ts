import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentEntity, PostEntity } from './post.entity';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([PostCommentEntity]),
    MediaModule,
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
