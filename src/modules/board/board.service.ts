import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';
import { BoardEntity } from './infrastructure/db/entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async findAll() {
    return await this.boardRepository.find();
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return board;
  }

  async create(data: CreateBoardDto) {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });
    if (!user) throw new Error('User not found');

    const board = this.boardRepository.create({
      ...data,
    });

    return await this.boardRepository.save(board);
  }

  async updateOne(userId: number, id: number, data: UpdateBoardDto) {
    const board = await this.getBoardById(id);
    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    if (board.userId !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.boardRepository.update(id, {
      ...data,
    });
  }

  async deleteOne(userId: number, id: number) {
    const board = await this.getBoardById(id);
    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    if (board.userId !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.boardRepository.remove(board);
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({ id });
  }
}
