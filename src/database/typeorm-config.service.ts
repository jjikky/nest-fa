import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<string>('database.type', {
        infer: true,
      }),
      host: this.configService.get<string>('database.host', {
        infer: true,
      }),
      port: this.configService.get<number>('database.port', {
        infer: true,
      }),
      database: this.configService.get<string>('database.name', {
        infer: true,
      }),
      username: this.configService.get<string>('database.username', {
        infer: true,
      }),
      password: this.configService.get<string>('database.password', {
        infer: true,
      }),
      synchronize: this.configService.get<boolean>('database.synchronize', {
        infer: true,
      }),
      entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      dropSchema: false,
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions;
  }
}

//  type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'jikky',
//       password: '0000',
//       database: 'nest-fa-board',
//       synchronize: false,
