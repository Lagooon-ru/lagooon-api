import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserEntity])
  users(): Promise<UserEntity[]> {
    return this.userService.getUsersService();
  }

  @Query(() => UserEntity)
  user(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.getUserByAttrService({ id: id });
  }
}
