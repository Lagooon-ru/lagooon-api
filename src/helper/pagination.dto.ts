import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PaginationDto {
  @Field()
  total: number;

  @Field()
  limit: number;

  @Field()
  page: number;
}

@InputType()
class SearchPaginationDto {
  @Field()
  limit: number;

  @Field()
  page: number;
}

export { PaginationDto, SearchPaginationDto };
