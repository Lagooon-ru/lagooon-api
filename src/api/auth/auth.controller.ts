import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { RegisterDto } from './types/register.type';
import { AuthService } from './auth.service';
import { User } from '../../core/user/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { TLogin } from './types/login.type';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ResetPassDto } from './types/reset.type';
import { VerifyDto } from './types/verify.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() register: RegisterDto,
    @RealIP() ip: string,
  ): Promise<TLogin> {
    console.log(ip);
    return this.authService.signupService(register);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: any, @RealIP() ip: string): Promise<TLogin> {
    console.log(ip);
    return this.authService.loginService(req.user as User);
  }

  @Post('/forget-password')
  async forgotEmail(@Body() body: any) {
    return this.authService.forgetPasswordService({ email: body.email });
  }

  @Post('/verify-token')
  async verifyToken(@Body() body: VerifyDto) {
    return this.authService.validateTokenService(body.vToken);
  }

  @Post('/reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Req() req: any, @Body() body: ResetPassDto) {
    return this.authService.resetPasswordService(req.user, body.password);
  }
}
