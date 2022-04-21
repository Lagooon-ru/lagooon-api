import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TUsers } from './types/users.type';
import { UsersSearchDto } from './types/search.type';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { FollowDto, TFollow } from './types/follow.type';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => TUsers)
  async users(@Args('search') search: UsersSearchDto): Promise<TUsers> {
    if (search.pagination?.limit > 99) {
      throw new BadRequestException('max limit is 99');
    }
    return this.userService.getUsersService(search);
  }

  @Query(() => UserEntity)
  async user(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.getUserByAttrService({ id: id });
  }

  @Mutation(() => TFollow)
  @UseGuards(GqlAuthGuard)
  async follow(
    @Args('follow') follower: FollowDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TFollow> {
    console.log(follower);
    console.log(user);
    const flr = await this.userService.getProfileService(follower.follower);
    if (!flr) {
      throw new BadRequestException('no exist follower');
    }
    return this.userService.followService(user, flr, follower.following);
  }
}
