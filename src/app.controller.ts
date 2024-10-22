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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(`IP Address: ${ip}`);
    return this.appService.getHello();
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `${name}`;
  }
}
