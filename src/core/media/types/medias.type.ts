import { Field, ObjectType } from '@nestjs/graphql';
import { MediaEntity } from '../media.entity';
import { PaginationDto, TPagination } from '../../../helper/pagination.dto';

@ObjectType()
class MediasDto {
  @Field(() => [MediaEntity])
  data: MediaEntity[];

  @Field(() => TPagination)
  pagination: TPagination;
}

export { MediasDto };
