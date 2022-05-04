import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TildaEntity } from './tilda.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TildaService {
  constructor(
    @InjectRepository(TildaEntity)
    private tildaRepository: Repository<TildaEntity>,
    private readonly httpService: HttpService,
  ) {}

  async getPagesService(): Promise<TildaEntity[]> {
    return this.tildaRepository.find();
  }

  async getFromTildaService(pageId: string): Promise<TildaEntity> {
    const newPage = await this.tildaRepository.create();
    const url = `https://api.tildacdn.info/v1/getpagefull/?publickey=gfhqy4l0rlwada2nsguo&secretkey=u1s1453b83bp9pqkvplw&pageid=${pageId}`;
    const { data } = await this.httpService.get(url).toPromise();
    console.log(data.result.id);

    if (!!data) {
      newPage.tildaId = data.result.id;
      newPage.projectid = data.result.projectid;
      newPage.title = data.result.title;
      newPage.descr = data.result.descr;
      newPage.img = data.result.img;
      newPage.featureimg = data.result.featureimg;
      newPage.alias = data.result.alias;
      newPage.date = data.result.date;
      newPage.sort = data.result.sort;
      newPage.published = data.result.published;
      newPage.fb_title = data.result.fb_title;
      newPage.filename = data.result.filename;
      newPage.html = data.result.html;
      await this.tildaRepository.save(newPage);
      return newPage;
    } else {
      throw new BadRequestException('Wrong page id or provider is not working');
    }
  }

  async getPageService(id: string): Promise<TildaEntity> {
    return this.tildaRepository.findOne({ tildaId: id });
  }
}
