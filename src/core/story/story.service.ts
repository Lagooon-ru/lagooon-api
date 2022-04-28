import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { StoryCommentEntity, StoryEntity } from './story.entity';
import {
  StoriesDto,
  StoryAddCommentDto,
  StoryCreateDto,
  StoryDto,
  StoryUpdateDto,
} from './types/input.type';
import { TStories, TStoryLike } from './types/object.type';
import { UserEntity } from '../user/user.entity';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
    @InjectRepository(StoryCommentEntity)
    private storyCommentRepository: Repository<StoryCommentEntity>,
    private mediaService: MediaService,
  ) {}

  async getStoriesService(search: StoriesDto): Promise<TStories> {
    const limit = search.pagination?.limit || 10;
    const page = search.pagination?.page || 0;
    const keyword = search.keyword || '';
    const where: FindManyOptions<UserEntity>['where'] = [];
    if (!!keyword) {
      where.push({ caption: Like(`%${keyword}%`) });
    }

    const [item, count] = await this.storyRepository.findAndCount({
      where,
      relations: ['photo', 'author', 'likes', 'comments'],
      order: {
        createdAt: 'DESC',
      },
      skip: page * limit,
      take: limit,
    });

    return {
      data: item,
      pagination: {
        limit: limit,
        page: page,
        total: count,
      },
    };
  }

  async getStoryService(story: StoryDto): Promise<StoryEntity> {
    return this.storyRepository.findOne({
      where: { id: story.id },
      relations: ['author', 'photo'],
    });
  }

  async getMyStoryService(user: UserEntity): Promise<StoryEntity[]> {
    return this.storyRepository.find({
      where: { author: user },
      relations: ['author', 'photo'],
    });
  }

  async getUserStoriesService(user: UserEntity): Promise<StoryEntity[]> {
    return this.storyRepository.find({ author: user });
  }

  async createStoryService(
    story: StoryCreateDto,
    author: UserEntity,
  ): Promise<StoryEntity> {
    const { caption, photo } = story;
    const p = await this.mediaService.getById(photo);
    if (!p) {
      throw new HttpException('Add a media at least', HttpStatus.BAD_REQUEST);
    }

    try {
      const newStory = await this.storyRepository.create();

      newStory.caption = caption;
      newStory.photo = p;
      newStory.author = author;

      await this.storyRepository.save(newStory);
      // await this.searchService.indexUser(newUser);

      return newStory;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateStoryService(
    update: StoryUpdateDto,
    story: StoryEntity,
  ): Promise<StoryEntity> {
    if (!!update.photo) {
      story.photo = await this.mediaService.getById(update.photo);
    }

    if (!!update.caption) {
      story.caption = update.caption;
    }

    await this.storyRepository.save(story);

    return story;
  }

  async likeStoryService(
    story: StoryEntity,
    author: UserEntity,
    like: boolean,
  ): Promise<TStoryLike> {
    if (like) {
      if (!!story.likes) {
        story.likes.push(author);
      } else {
        story.likes = [author];
      }
    } else {
      if (!!story.likes) {
        story.likes = story.likes.filter((l) => l.id !== author.id);
      }
    }
    await this.storyRepository.save(story);
    return { status: like };
  }

  async createCommentService(
    comment: StoryAddCommentDto,
    author: UserEntity,
  ): Promise<StoryCommentEntity> {
    const newComment = await this.storyCommentRepository.create();
    if (!!comment.parentId) {
      const parent = await this.storyCommentRepository.findOne(
        comment.parentId,
      );
      if (!!parent) {
        newComment.parent = parent;
      } else {
        throw new BadRequestException('invalid parent id');
      }
    }

    const story = await this.storyCommentRepository.findOne(comment.storyId);

    if (!story) {
      throw new BadRequestException('invalid feed id');
    }

    newComment.author = author;
    newComment.comment = comment.content;
    await this.storyCommentRepository.save(newComment);
    return newComment;
  }

  async getCommentsService(story): Promise<StoryCommentEntity[]> {
    return this.storyCommentRepository.find({
      where: { story: story.id },
      order: { createdAt: 'DESC' },
      relations: ['author', 'author.avatar', 'likes'],
    });
  }
}
