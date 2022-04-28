import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryCommentEntity, StoryEntity } from './story.entity';
import { UserModule } from '../user/user.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryEntity, StoryCommentEntity]),
    UserModule,
    MediaModule,
  ],
  providers: [StoryService, StoryResolver],
})
export class StoryModule {}
