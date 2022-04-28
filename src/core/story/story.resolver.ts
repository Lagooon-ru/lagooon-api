import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { StoryCommentEntity, StoryEntity } from './story.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { TStories, TStoryLike } from './types/object.type';
import {
  StoriesDto,
  StoriesOfUserDto,
  StoryAddCommentDto,
  StoryCreateDto,
  StoryDto,
  StoryGetCommentsDto,
  StoryLikeDto,
  StoryUpdateDto,
} from './types/input.type';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Resolver()
export class StoryResolver {
  constructor(
    private storyService: StoryService,
    private readonly userService: UserService,
  ) {}

  @Query(() => TStories)
  async stories(@Args('arg') search: StoriesDto): Promise<TStories> {
    return this.storyService.getStoriesService(search);
  }

  @Query(() => StoryEntity)
  async story(@Args('arg') story: StoryDto): Promise<StoryEntity> {
    return this.storyService.getStoryService(story);
  }

  @Query(() => StoryEntity)
  @UseGuards(GqlAuthGuard)
  async storyOfMe(@CurrentUser() user: UserEntity): Promise<StoryEntity[]> {
    return this.storyService.getMyStoryService(user);
  }

  @Query(() => StoryEntity)
  async storyOfUser(
    @Args('arg') req: StoriesOfUserDto,
  ): Promise<StoryEntity[]> {
    const user = await this.userService.getUserByAttrService({ id: req.id });
    if (!user) {
      throw new BadRequestException('no registered user with this id');
    }
    return this.storyService.getUserStoriesService(user);
  }

  @Mutation(() => StoryEntity)
  @UseGuards(GqlAuthGuard)
  async storyCreate(
    @Args('arg') story: StoryCreateDto,
    @CurrentUser() user: UserEntity,
  ): Promise<StoryEntity> {
    return this.storyService.createStoryService(story, user);
  }

  @Mutation(() => StoryEntity)
  async storyUpdate(
    @Args('arg') update: StoryUpdateDto,
    @CurrentUser() user: UserEntity,
  ): Promise<StoryEntity> {
    const story = await this.storyService.getStoryService({ id: update.id });

    if (!story) {
      throw new BadRequestException('Invalid storyId');
    }

    if (story.author.id !== user.id) {
      throw new BadRequestException(
        "You don't have the permission to update this story",
      );
    }
    return this.storyService.updateStoryService(update, story);
  }

  @Mutation(() => TStoryLike)
  @UseGuards(GqlAuthGuard)
  async storyLike(
    @Args('arg') story: StoryLikeDto,
    @CurrentUser() author: UserEntity,
  ) {
    const st = await this.storyService.getStoryService({ id: story.id });
    if (!st) {
      throw new BadRequestException('invalid story id');
    }
    return this.storyService.likeStoryService(st, author, story.action);
  }

  @Mutation(() => StoryCommentEntity)
  @UseGuards(GqlAuthGuard)
  async storyAddComment(
    @Args('arg') comment: StoryAddCommentDto,
    @CurrentUser() author: UserEntity,
  ) {
    return this.storyService.createCommentService(comment, author);
  }

  @Query(() => [StoryCommentEntity])
  async storyGetComments(@Args('arg') story: StoryGetCommentsDto) {
    return this.storyService.getCommentsService(story);
  }
}
