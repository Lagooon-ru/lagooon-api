import { Field, ObjectType } from '@nestjs/graphql';
import { StoryEntity } from '../story.entity';
import { TPagination } from '../../../helper/pagination.dto';

@ObjectType()
class TStories {
  @Field(() => [StoryEntity])
  data: StoryEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

@ObjectType()
class TStoryLike {
  @Field()
  status: boolean;
}

export { TStories, TStoryLike };
