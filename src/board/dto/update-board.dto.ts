import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ description: '제목', required: true, example: '지키' })
  title?: string;

  @IsOptional()
  @ApiProperty({ description: '내용', required: true, example: 'hi' })
  contents?: string;
}
