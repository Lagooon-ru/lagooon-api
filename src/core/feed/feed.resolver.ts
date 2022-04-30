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
  FeedGetCommentsDto,
  FeedLikeDto,
  FeedsSearchDto,
} from './types/input';
import { PaginationDto } from 'src/helper/pagination.dto';
import {PostService} from "../post/post.service";
import {PostEntity} from "../post/post.entity";

@Resolver()
export class FeedResolver {
  constructor(
      private feedService: FeedService,
      private postService: PostService,
  ) {}

  @Mutation(() => TFeeds)
  async feeds(@Args('search') search: FeedsSearchDto) {
    return this.feedService.getFeedsService(search);
  }

  @Query(() => [PostEntity])
  @UseGuards(GqlAuthGuard)
  async getFeeds(@Args('params') params: PaginationDto) {
    return this.postService.getPosts({
      pagination: params,
      sort: 'createdAt',
      keyword: null,
    });
  }

  @Query(() => [FeedEntity])
  @UseGuards(GqlAuthGuard)
  async getOwnFeeds(
    @Args('params') params: PaginationDto,
    @CurrentUser() author: UserEntity,
  ) {
    return await this.feedService.getOwn(params, author);
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
