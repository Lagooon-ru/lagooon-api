import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

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
  @IsNumber()
  @Field({ nullable: true })
  limit: number;

  @IsNumber()
  @Field({ nullable: true })
  page: number;
}

export { PaginationDto, TPagination };
