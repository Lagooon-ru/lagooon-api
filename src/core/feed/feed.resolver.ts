import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedService } from './feed.service';
import { FeedCommentEntity, FeedEntity } from './feed.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { TFeedAddComment, TFeedLike, TFeeds } from './types/object';
import {
  FeedAddCommentDto,
  FeedCreateDto,
  FeedLikeDto,
  FeedsSearchDto,
} from './types/input';

@Resolver()
export class FeedResolver {
  constructor(private feedService: FeedService) {}

  @Query(() => TFeeds)
  async feeds(@Args('search') search: FeedsSearchDto) {
    return this.feedService.getFeedsService(search);
  }

  @Mutation(() => FeedEntity)
  @UseGuards(GqlAuthGuard)
  async feedCreate(
    @Args('feed') feed: FeedCreateDto,
    @CurrentUser() author: UserEntity,
  ) {
    return this.feedService.createFeedService(feed, author);
  }

  @Mutation(() => TFeedLike)
  @UseGuards(GqlAuthGuard)
  async feedLike(
    @Args('feed') feed: FeedLikeDto,
    @CurrentUser() author: UserEntity,
  ) {
    const fd = await this.feedService.validate({ id: feed.id });
    if (!fd) {
      throw new BadRequestException('invalid feed id');
    }
    return this.feedService.likeFeedService(fd, author, feed.action);
  }

  @Mutation(() => FeedCommentEntity)
  @UseGuards(GqlAuthGuard)
  async feedAddComment(
    @Args('feed') comment: FeedAddCommentDto,
    @CurrentUser() author: UserEntity,
  ) {
    return this.feedService.createCommentService(comment, author);
  }
}
