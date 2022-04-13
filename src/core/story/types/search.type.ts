import { InputType } from '@nestjs/graphql';
import { SearchDto } from '../../../helper/search.dto';

@InputType()
class StoriesSearchDto extends SearchDto {}

export { StoriesSearchDto };
