import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sendMail')
  async sendMail(@Body() args: { from, subject, message }) {
    const resp = await this.appService._sendMail(args.from, args.subject, args.message);
    if (resp.accepted) {
      return {
        message: `Email has been sent`,
      };
    }
  }
}
