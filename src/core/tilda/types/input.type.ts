import { Field, InputType } from '@nestjs/graphql';

@InputType()
class TildaPageDto {
  @Field()
  id: string;
}

@InputType()
class GetFormTildaDto {
  @Field()
  pageId: string;
}

export { TildaPageDto, GetFormTildaDto };
