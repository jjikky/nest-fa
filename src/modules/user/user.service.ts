import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/db/entities/user.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from '../board/infrastructure/db/entities/board.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

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
}
