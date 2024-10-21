import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ description: '제목', required: true, example: 'jikky' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '내용', required: true, example: 'hi' })
  contents: string;
}
