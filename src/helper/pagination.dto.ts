import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
class TPagination {
  @Field()
  total: number;

  @Field()
  limit: number;

  @Field()
  page: number;
}

@InputType()
class PaginationDto {
  @Field()
  limit: number;

  @Field()
  page: number;
}

export { PaginationDto, TPagination };
