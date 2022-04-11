import {
  Controller,
  Param,
  Get,
  Render,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/reset-pass/:token')
  @Render('pages/reset-pass')
  async resetPassword(@Param('token') token: any) {
    return this.authService.resetViewService(token);
  }

  @Get('/email/:token')
  @Render('pages/email-confirm')
  async emailConfirmAction(@Param('token') token: any) {
    return this.authService.emailConfirmService(token);
  }

  @Post('/reset-pass')
  async resetPasswordAction(@Body() body: any) {
    const user = await this.authService.validateUserService({
      vToken: body.token,
    });

    if (!user) {
      throw new HttpException('invalid token!', 401);
    }

    return this.authService.resetPasswordService(user, body.password);
  }
}
