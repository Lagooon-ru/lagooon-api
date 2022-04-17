import { Field, InputType } from '@nestjs/graphql';
import { PaginationDto } from './pagination.dto';

@InputType()
class SearchDto {
  @Field(() => PaginationDto)
  pagination: PaginationDto;

  @Field({ nullable: true })
  keyword: string;
}

export { SearchDto };
