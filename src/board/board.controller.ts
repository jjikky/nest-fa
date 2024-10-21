import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(Number(id));
  }

  @Post()
  create(@Body() board: CreateBoardDto) {
    return this.boardService.create(board);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() board: CreateBoardDto) {
    console.log(id);
    return this.boardService.updateOne(Number(id), board);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardService.deleteOne(Number(id));
  }
}
