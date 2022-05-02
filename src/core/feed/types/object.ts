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

@ObjectType()
class TFeedLike {
  @Field()
  status: boolean;
}

@ObjectType()
class TFeedAddComment {
  @Field()
  status: boolean;
}
@ObjectType()
class TDelete {
  @Field()
  status: boolean;
}
export { TFeeds, TFeedLike, TFeedAddComment, TDelete };
