import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/db/entities/user.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from '../board/infrastructure/db/entities/board.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, name, password } = data;
    const encryptedPassword = await this.encryptPassword(password);
    return this.userRepository.save({
      username,
      name,
      password: encryptedPassword,
    });
  }

  async getUser() {
    const qb = this.userRepository.createQueryBuilder('User');

    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(BoardEntity, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');
    return qb.getMany();
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async encryptPassword(password: string) {
    const DEFAULT_SALT = 11;
    return await hash(password, DEFAULT_SALT);
  }

  async getUserByUsernameWithPassword(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }
}
