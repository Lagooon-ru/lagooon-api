import { Field, ObjectType } from '@nestjs/graphql';
import { TPagination } from '../../../helper/pagination.dto';
import { FeedEntity } from '../feed.entity';

@ObjectType()
class TFeeds {
  @Field(() => [FeedEntity])
  data: FeedEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

export { TFeeds };
