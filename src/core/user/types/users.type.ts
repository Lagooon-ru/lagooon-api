import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { TPagination } from '../../../helper/pagination.dto';

@ObjectType()
class UsersDto {
  @Field(() => [UserEntity])
  data: UserEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

export { UsersDto };
