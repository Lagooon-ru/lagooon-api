import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from './pagination.dto';

@InputType()
class SearchDto {
  @Field(() => PaginationDto, { nullable: true })
  pagination: PaginationDto;

  @Field({ nullable: true })
  sort: string;

  @Field({ nullable: true })
  keyword: string;
}

export { SearchDto };
