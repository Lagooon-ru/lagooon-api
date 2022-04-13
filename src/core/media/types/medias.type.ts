import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media.entity';
import { PaginationDto } from '../../../helper/pagination.dto';

@ObjectType()
class MediasDto {
  @Field(() => [MediaEntity])
  data: MediaEntity[];

  @Field(() => PaginationDto)
  pagination: PaginationDto;
}

export { MediasDto };
