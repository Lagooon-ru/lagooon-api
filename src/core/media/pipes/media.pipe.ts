import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MediaPipe implements PipeTransform {
  transform(
    files: Array<Express.Multer.File>,
    metadata: ArgumentMetadata,
  ): Express.Multer.File | Express.Multer.File[] {
    if (files.length === 0) {
      throw new BadRequestException('Загрузите контент.');
    }
    if (files.length > 10) {
      throw new BadRequestException('Максимальная загрузка до 10 файлов.');
    }
    for (let file of files) {
      if (file.size > 150000000) {
        throw new BadRequestException('Размер не должен превышать 150 мб ');
      }
      if (
        !file.mimetype.includes('video') &&
        !file.mimetype.includes('image')
      ) {
        throw new BadRequestException('Неверный формат.');
      }
    }
    return files;
  }
}
