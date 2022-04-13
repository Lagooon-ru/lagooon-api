import { InputType } from '@nestjs/graphql';

import { SearchDto } from '../../../helper/search.dto';

@InputType()
class UsersSearchDto extends SearchDto {}

export { UsersSearchDto };
