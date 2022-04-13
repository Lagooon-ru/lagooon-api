import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryEntity } from './story.entity';
import { StoriesSearchDto } from './types/search.type';
import { StoriesDto } from './types/stories.type';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
  ) {}

  async getStoriesService(search: StoriesSearchDto): Promise<StoriesDto> {
    const data = await this.storyRepository.find();
    const total = await this.storyRepository.count();
    return {
      data: data,
      pagination: {
        ...search.pagination,
        total: total,
      },
    };
  }

  async getStoryService() {
    return this.storyRepository.findOne();
  }
}
