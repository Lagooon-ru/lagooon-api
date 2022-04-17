import { Field, ObjectType } from '@nestjs/graphql';
import { TPagination } from '../../../helper/pagination.dto';
import { PostEntity } from '../post.entity';

@ObjectType()
class PostsDto {
  @Field(() => [PostEntity])
  data: PostEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

export { PostsDto };
