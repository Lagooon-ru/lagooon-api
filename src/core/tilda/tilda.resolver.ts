import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TildaService } from './tilda.service';
import { TildaEntity } from './tilda.entity';
import { GetFormTildaDto, TildaPageDto } from './types/input.type';

@Resolver()
export class TildaResolver {
  constructor(private tildaService: TildaService) {}

  @Query(() => [TildaEntity])
  async tildaPages(): Promise<TildaEntity[]> {
    return this.tildaService.getPagesService();
  }

  @Mutation(() => TildaEntity)
  async tildaPage(@Args('arg') id: TildaPageDto): Promise<TildaEntity> {
    return this.tildaService.getPageService(id.id);
  }

  @Mutation(() => TildaEntity)
  async getFromTilda(@Args('arg') page: GetFormTildaDto): Promise<TildaEntity> {
    return this.tildaService.getFromTildaService(page.pageId);
  }
}
