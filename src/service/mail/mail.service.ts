import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationMail(user: UserEntity, token: string) {
    const url = `${process.env.FRONTEND_URL}/auth/email/${token}`;
    return await this.mailerService.sendMail({
      from: `"lagooon" <${process.env.MAIL_FROM}>`,
      to: user.email,
      subject:
        'подтверждение адреса электронной почты для входа в приложение Lagooon.',
      template: 'confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendForgetPasswordMail(user: UserEntity, token: string) {
    const url = `${process.env.FRONTEND_URL}/auth/reset-pass/${token}`;
    return await this.mailerService.sendMail({
      from: `"lagooon" <${process.env.MAIL_FROM}>`,
      to: user.email,
      subject: 'Сброс пароля для приложения Lagooon',
      template: 'forgetpass',
      context: {
        url,
        email: user.email,
      },
    });
  }
}
