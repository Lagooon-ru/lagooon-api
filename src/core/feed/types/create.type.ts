import { Field, InputType } from '@nestjs/graphql';

@InputType()
class FeedDto {
  @Field({ nullable: false })
  caption: string;

  @Field(() => [String])
  photos: string[];
}

export { FeedDto };
