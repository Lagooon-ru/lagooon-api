import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
class FollowDto {
  @Field()
  follower: string;

  @Field()
  following: boolean;
}

@ObjectType()
class TFollow {
  @Field({ nullable: true })
  status: boolean;
}

export { FollowDto, TFollow };
