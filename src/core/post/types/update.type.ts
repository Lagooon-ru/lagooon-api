import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdatePostDto {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}

export { UpdatePostDto };
