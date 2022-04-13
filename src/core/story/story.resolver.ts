import { Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { StoryEntity } from './story.entity';
import { StoriesSearchDto } from './types/search.type';
import { StoriesDto } from './types/stories.type';

@Resolver()
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  @Query(() => StoriesDto)
  stories(search: StoriesSearchDto): Promise<StoriesDto> {
    return this.storyService.getStoriesService(search);
  }

  @Query(() => StoryEntity)
  story(): Promise<StoryEntity> {
    return this.storyService.getStoryService();
  }
}
