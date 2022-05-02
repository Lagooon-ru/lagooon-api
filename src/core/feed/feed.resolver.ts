import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FeedService } from './feed.service';
import { FeedCommentEntity, FeedEntity } from './feed.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { TFeedLike, TFeeds } from './types/object';
import {
  FeedAddCommentDto,
  FeedCreateDto,
  FeedGetCommentsDto,
  FeedLikeDto,
  FeedsSearchDto,
} from './types/input';

@Resolver()
export class FeedResolver {
  constructor(private feedService: FeedService) {}

  @Mutation(() => TFeeds)
  @UseGuards(GqlAuthGuard)
  async feeds(
    @Args('search') search: FeedsSearchDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.feedService.getFeedsService(search, user);
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

  @Mutation(() => [FeedCommentEntity])
  async feedGetComments(@Args('feed') feed: FeedGetCommentsDto) {
    return this.feedService.feedGetCommentsService(feed);
  }
}
