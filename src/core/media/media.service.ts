import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from './media.entity';
import { MediasDto } from './types/medias.type';
import { MediasSearchDto } from './types/search.type';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private postRepository: Repository<MediaEntity>,
  ) {}

  async uploadService(): Promise<MediaEntity> {
    return;
  }

  async getMedias(search: MediasSearchDto): Promise<MediasDto> {
    return {
      data: null,
      pagination: {
        ...search.pagination,
        total: 10,
      },
    };
  }
}
