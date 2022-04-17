import { Field, ObjectType } from '@nestjs/graphql';
import { TPagination } from '../../../helper/pagination.dto';
import { StoryEntity } from '../story.entity';

@ObjectType()
class StoriesDto {
  @Field(() => [StoryEntity])
  data: StoryEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

export { StoriesDto };
