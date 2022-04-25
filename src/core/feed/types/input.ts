import { Field, InputType } from '@nestjs/graphql';
import { SearchDto } from '../../../helper/search.dto';

@InputType()
class FeedsSearchDto extends SearchDto {
  @Field({ nullable: true })
  author: string;
}

@InputType()
class FeedCreateDto {
  @Field({ nullable: false })
  caption: string;

  @Field(() => [String])
  photos: string[];
}

@InputType()
class FeedLikeDto {
  @Field()
  id: string;

  @Field()
  action: true;
}

@InputType()
class FeedAddCommentDto {
  @Field({ nullable: true })
  parentId: string;

  @Field()
  feedId: string;

  @Field()
  content: string;
}

export { FeedsSearchDto, FeedCreateDto, FeedLikeDto, FeedAddCommentDto };
