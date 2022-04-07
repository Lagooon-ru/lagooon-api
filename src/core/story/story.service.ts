import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryEntity } from './story.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
  ) {}

  async getStoriesService() {
    return this.storyRepository.find();
  }

  async getStoryService() {
    return this.storyRepository.findOne();
  }
}
