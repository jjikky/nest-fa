import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserFactory } from './user.factory';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private userFactory: UserFactory,
  ) {}

  async run() {
    const countUser = await this.repository.count({});

    if (!countUser) {
      await this.repository.save(
        faker.helpers.multiple(this.userFactory.createRandomUser(), {
          count: 5,
        }),
      );
    }
  }
}
