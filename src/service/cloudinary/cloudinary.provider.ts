import { v2 as Cld } from 'cloudinary';
import { CLOUDINARY } from './constants';
import 'dotenv/config';

console.log(process.env.CLOUDINARY_NAME);

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return Cld.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });
  },
};
