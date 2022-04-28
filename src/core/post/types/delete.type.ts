import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TDelete {
  @Field()
  status: boolean;
}
