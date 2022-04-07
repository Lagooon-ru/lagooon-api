import { Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { StoryEntity } from './story.entity';

@Resolver()
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  @Query((returns) => [StoryEntity])
  stories(): Promise<StoryEntity[]> {
    return this.storyService.getStoriesService();
  }

  @Query((returns) => StoryEntity)
  story(): Promise<StoryEntity> {
    return this.storyService.getStoryService();
  }
}
