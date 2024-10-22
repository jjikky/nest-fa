import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Logger,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(this.configService.get('ENVIRONMENT'));
    console.log(`IP Address: ${ip}`);
    return this.appService.getHello();
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `${name}`;
  }
}
