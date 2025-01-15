import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private readonly mailService: MailerService,
    private readonly configSvc: ConfigService
  ) {

  }
  getHello(): string {
    return 'Hello Mailer!';
  }

  async _sendMail(from, subject, message) {
    let result: {
      response;
      messageId;
      accepted: string[];
      rejected: string[];
      envelopeTime;
      messageTime;
    };
    try {
      result = await  this.mailService.sendMail({
        from: message,
        to: this.configSvc.get<string>('EMAIL_TO'),
        subject: subject,
        text: message,
      });
    } catch (e) {
      throw e;
    }

    return result;
  }
}
