import { InputType } from '@nestjs/graphql';
import { SearchDto } from '../../../helper/search.dto';

@InputType()
class PostsSearchDto extends SearchDto {}

export { PostsSearchDto };
