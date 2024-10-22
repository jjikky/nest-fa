import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/board/infrastructure/db/entities/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '유저 아이디', example: 'admin' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '비밀번호', example: 'password' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '작성한 게시글' })
  @OneToMany(() => Board, (board: Board) => board.user)
  boards: Board[];
}
