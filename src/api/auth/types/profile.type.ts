import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProfileDto {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  avatar: string;
}
