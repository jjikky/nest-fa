import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip: string): string {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    console.log(`IP Address: ${ip}`);
    return this.appService.getHello();
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `${name}`;
  }
}
