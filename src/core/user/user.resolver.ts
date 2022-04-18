import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TUsers } from './types/users.type';
import { UsersSearchDto } from './types/search.type';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => TUsers)
  users(@Args('search') search: UsersSearchDto): Promise<TUsers> {
    if (search.pagination?.limit > 99) {
      throw new BadRequestException('max limit is 99');
    }
    return this.userService.getUsersService(search);
  }

  @Query(() => UserEntity)
  user(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.getUserByAttrService({ id: id });
  }
}
