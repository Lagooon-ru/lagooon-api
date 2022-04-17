import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationDto, TPagination } from '../../../helper/pagination.dto';

@ObjectType()
export class TSearch {
  @Field(() => [String])
  results: string[];

  @Field()
  pagination: TPagination;
}

@InputType()
export class SearchDto {
  @Field()
  keyword: string;

  @Field()
  pagination: PaginationDto;
}
