import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationDto } from '../../../helper/pagination.dto';
import { StoryEntity } from '../story.entity';

@ObjectType()
class StoriesDto {
  @Field(() => [StoryEntity])
  data: StoryEntity[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

export { StoriesDto };
