import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto, SearchPaginationDto } from './pagination.dto';

@InputType()
class SearchDto {
  @Field(() => SearchPaginationDto)
  pagination: PaginationDto;

  @Field({ nullable: true })
  keyword: string;
}

export { SearchDto };
