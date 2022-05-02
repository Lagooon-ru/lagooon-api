import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationMail(user: UserEntity, token: string) {
    return await this.mailerService.sendMail({
      from: `"Lagooon" <${process.env.MAIL_FROM}>`,
      to: user.email,
      subject: 'Подтвердите свой адрес электронной почты в Lagooon.',
      template: 'confirmation',
      context: {
        name: user.name,
        token,
      },
    });
  }

  async sendForgetPasswordMail(user: UserEntity, token: string) {
    return await this.mailerService.sendMail({
      from: `"Lagooon" <${process.env.MAIL_FROM}>`,
      to: user.email,
      subject: 'Сброс пароля для приложения Lagooon',
      template: 'forgetpass',
      context: {
        token,
        email: user.email,
      },
    });
  }
}
