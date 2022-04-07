import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [UserEntity])
  users(): Promise<UserEntity[]> {
    return this.userService.getUsersService();
  }
}
