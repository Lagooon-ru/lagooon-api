import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from './media.entity';
import { MediasDto } from './types/medias.type';
import { MediasSearchDto } from './types/search.type';
import { CloudinaryService } from '../../service/cloudinary/cloudinary.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    private readonly cldService: CloudinaryService,
  ) {}

  async uploadService(file, user: UserEntity): Promise<MediaEntity> {
    const newMedia = await this.mediaRepository.create();
    const f = await this.cldService.uploadImage(file);
    const { url, format, bytes, width, height, asset_id, public_id } = f;
    newMedia.path = url;
    newMedia.format = format;
    newMedia.size = bytes;
    newMedia.height = height;
    newMedia.width = width;
    newMedia.asset_id = asset_id;
    newMedia.public_id = public_id;
    newMedia.author = user;

    return this.mediaRepository.save(newMedia);
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

  async getById(id: string): Promise<MediaEntity> {
    return this.mediaRepository.findOne(id);
  }
}
