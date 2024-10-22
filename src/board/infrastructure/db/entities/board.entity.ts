import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/infrastructure/db/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'user_id' })
  @Column()
  userId: number;

  @ApiProperty({ description: '내용' })
  @Column()
  contents: string;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
