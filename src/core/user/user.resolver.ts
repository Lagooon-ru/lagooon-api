import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TUsers } from './types/users.type';
import { UserSearchDto, UsersSearchDto } from './types/search.type';
import {BadRequestException, Inject, UseGuards} from '@nestjs/common';
import { FollowDto, TFollow } from './types/follow.type';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { PostService } from '../post/post.service';
import {PostEntity} from "../post/post.entity";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Mutation(() => [UserEntity])
  @UseGuards(GqlAuthGuard)
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUserService();
  }

  @Mutation(() => TUsers)
  @UseGuards(GqlAuthGuard)
  async users(@Args('search') search: UsersSearchDto): Promise<TUsers> {
    if (search.pagination?.limit > 99) {
      throw new BadRequestException('max limit is 99');
    }
    return this.userService.getUsersService(search);
  }


  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async user(@Args('search') id: UserSearchDto): Promise<UserEntity> {
    return this.userService.getUserByAttrService(id);
  }

  @Mutation(() => TFollow)
  @UseGuards(GqlAuthGuard)
  async follow(
    @Args('follow') follower: FollowDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TFollow> {
    const flr = await this.userService.getProfileService(follower.follower);
    if (!flr) {
      throw new BadRequestException('no exist follower');
    }
    return this.userService.followService(user, flr, follower.following);
  }

  @ResolveField('posts', () => [PostEntity])
  @UseGuards(GqlAuthGuard)
  async posts(@Parent() user: UserEntity) {
    return this.postService.getUserPosts(user);
  }
}
