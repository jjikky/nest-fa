import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
  ) {}

  createRandomUser() {
    return () => {
      return this.repositoryUser.create({
        username: faker.person.fullName(),
        name: faker.person.firstName(),
        password: faker.internet.password(),
      });
    };
  }
}
