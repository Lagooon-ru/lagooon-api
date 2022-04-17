import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
import { ReleaseDto, TVersion, VersionDto } from './app.type';
import { MediaService } from './core/media/media.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private appRepository: Repository<AppEntity>,
    private mediaService: MediaService,
  ) {}

  async getVersionsService(): Promise<AppEntity[]> {
    return this.appRepository.find();
  }

  async getInfoService(dat: VersionDto): Promise<TVersion> {
    const version = await this.appRepository.findOne({ version: dat.version });
    return {
      ...version,
      img: `https://res.cloudinary.com/lagooon/image/upload/w_1080,ar_4:5,c_fill,g_auto,q_auto:low/v${version.version}/${version.image.public_id}.jpg`,
    };
  }

  async createReleaseService(dat: ReleaseDto): Promise<TVersion> {
    const { version, title, description, image } = dat;

    try {
      const newRelease = await this.appRepository.create();
      newRelease.version = version;
      newRelease.title = title;
      newRelease.description = description;

      if (!!image) {
        const img = await this.mediaService.getById(image);
        if (!!img) {
          newRelease.image = img;
        }
      }

      await this.appRepository.save(newRelease);
      return {
        ...newRelease,
        img: `https://res.cloudinary.com/lagooon/image/upload/w_1080,ar_4:5,c_fill,g_auto,q_auto:low/v${newRelease.version}/${newRelease.image.public_id}.jpg`,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
