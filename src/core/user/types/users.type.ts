import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { PaginationDto } from '../../../helper/pagination.dto';

@ObjectType()
class UsersDto {
  @Field(() => [UserEntity])
  data: UserEntity[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

export { UsersDto };
