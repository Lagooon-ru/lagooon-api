import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto } from '../../../helper/pagination.dto';
import { PostEntity } from '../post.entity';

@ObjectType()
class PostsDto {
  @Field(() => [PostEntity])
  data: PostEntity[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

export { PostsDto };
