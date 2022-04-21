import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedService } from './feed.service';
import { TFeeds } from './types/feeds.type';
import { FeedsSearchDto } from './types/search.type';
import { FeedDto } from './types/create.type';
import { FeedEntity } from './feed.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';

@Resolver()
export class FeedResolver {
  constructor(private feedService: FeedService) {}

  @Query(() => TFeeds)
  async feeds(@Args('search') search: FeedsSearchDto) {
    return this.feedService.getFeeds(search);
  }

  @Mutation(() => FeedEntity)
  @UseGuards(GqlAuthGuard)
  async createFeed(
    @Args('feed') feed: FeedDto,
    @CurrentUser() author: UserEntity,
  ) {
    return this.feedService.createFeed(feed, author);
  }
}
