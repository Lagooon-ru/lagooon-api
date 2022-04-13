import { InputType } from '@nestjs/graphql';
import { SearchDto } from '../../../helper/search.dto';

@InputType()
class MediasSearchDto extends SearchDto {}

export { MediasSearchDto };
