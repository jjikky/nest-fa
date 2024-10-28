import { UserSeedService } from './user-seed.service';
import { UserFactory } from './user.factory';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeedService, UserFactory],
  exports: [UserSeedService, UserFactory],
})
export class UserSeedModule {}
