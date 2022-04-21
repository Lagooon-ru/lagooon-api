import { InputType } from '@nestjs/graphql';
import { SearchDto } from '../../../helper/search.dto';

@InputType()
class FeedsSearchDto extends SearchDto {}

export { FeedsSearchDto };
