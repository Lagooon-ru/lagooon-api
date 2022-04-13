import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UsersDto } from './types/users.type';
import { UsersSearchDto } from './types/search.type';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UsersDto)
  users(@Args('search') search: UsersSearchDto): Promise<UsersDto> {
    return this.userService.getUsersService(search);
  }

  @Query(() => UserEntity)
  user(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.getUserByAttrService({ id: id });
  }
}
