import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  Response,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { MediaService } from './media.service';
import { MediaPipe } from './pipes/media.pipe';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles(MediaPipe) files: Array<Express.Multer.File>,
    @Req() req,
  ): Promise<any> {
    return this.mediaService.uploadVideo(files, req.user);
  }

  @Post('uploads')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('no file');
    }
    return this.mediaService.uploadService(file, req.user);
  }
}
