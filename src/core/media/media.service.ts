import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MediaEntity } from './media.entity';
import { MediasDto } from './types/medias.type';
import { MediasSearchDto } from './types/search.type';
import { CloudinaryService } from '../../service/cloudinary/cloudinary.service';
import { UserEntity } from '../user/user.entity';
import 'dotenv/config';
import { HttpService } from '@nestjs/axios';
import { uploadFile } from 'src/helper/file-upload';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    private readonly cldService: CloudinaryService,
    private readonly httpService: HttpService,
  ) {}

  async uploadService(file, user: UserEntity): Promise<MediaEntity> {
    console.log(file);
    if (file.mimetype.includes('image')) {
      const { isForbidden } = await this.checkPron(file);
      if (isForbidden) {
        throw new BadRequestException(
          'Наши алгоритмы определили эту фотографию как небезопасную для загрузки. Наши алгоритмы несовершенны и мы постоянно работаем над их улучшением. Если Вы считаете, что видите это сообщение по ошибке, то свяжитесь с нами, мы обязательно поможем!',
        );
      }
    }

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

  async uploadVideo(files: any, user: UserEntity): Promise<MediaEntity[]> {
    const result: MediaEntity[] = [];

    for (const file of files) {
      const url = await uploadFile(file);
      const fileUpload = await this.mediaRepository.save({
        path: url,
        author: user,
        size: file.size,
        format: file.mimetype,
      });
      result.push(fileUpload);
    }
    return result;
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

  getByIds(ids: string[]): Promise<MediaEntity[]> {
    return this.mediaRepository.find({ id: In(ids) });
  }

  async checkPron(file: any) {
    try {
      const getTokenUrl = `https://iam.api.cloud.yandex.net/iam/v1/tokens`;
      const checkUrl = `https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze`;

      const res = await this.httpService
        .post(getTokenUrl, { yandexPassportOauthToken: process.env.YANDEX_KEY })
        .toPromise();

      const { data } = await this.httpService
        .post(
          checkUrl,
          {
            folderId: 'b1g4be97mmeq1hch19vg',
            analyze_specs: [
              {
                content: file.buffer.toString('base64'),
                features: [
                  {
                    type: 'CLASSIFICATION',
                    classificationConfig: {
                      model: 'moderation',
                    },
                  },
                ],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${res.data.iamToken}`,
            },
          },
        )
        .toPromise();
      const adultRank =
        data.results[0].results[0].classification.properties[0].probability;

      console.log(adultRank);

      if (adultRank > 0.75) {
        return { adultRank, isForbidden: true };
      } else {
        return { adultRank, isForbidden: false };
      }
    } catch (e) {
      console.log(e);
      return { adultRank: -1, isForbidden: false };
    }
  }
}
