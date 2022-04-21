import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PostDto {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String])
  photos: string[];
}

export { PostDto };
