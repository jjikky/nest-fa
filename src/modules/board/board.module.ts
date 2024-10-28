import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './infrastructure/db/entities/board.entity';
import { UserEntity } from 'src/modules/user/infrastructure/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
