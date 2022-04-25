import { Field, InputType } from '@nestjs/graphql';

import { SearchDto } from '../../../helper/search.dto';

@InputType()
class UsersSearchDto extends SearchDto {}

@InputType()
class UserSearchDto {
  @Field()
  id: string;
}

export { UsersSearchDto, UserSearchDto };
