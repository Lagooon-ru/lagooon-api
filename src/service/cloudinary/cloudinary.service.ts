import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as Cld,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file): Promise<UploadApiResponse | UploadApiErrorResponse> {
    console.log(file);
    return new Promise((resolve, reject) => {
      const upload = Cld.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      Readable.from(file.buffer).pipe(upload);
    });
  }
}
