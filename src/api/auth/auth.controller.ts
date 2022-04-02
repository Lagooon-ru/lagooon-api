import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { RegisterDto } from './types/register.type';
import { AuthService } from './auth.service';
import { User } from '../../model/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() register: RegisterDto, @RealIP() ip: string) {
    console.log(ip);
    return this.authService.signupService(register);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: any, @RealIP() ip: string) {
    console.log(ip);
    return this.authService.loginService(req.user as User);
  }
}
