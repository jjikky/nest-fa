import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.boardService.findOne(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) board: CreateBoardDto) {
    return await this.boardService.create(board);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) board: UpdateBoardDto,
  ) {
    return await this.boardService.updateOne(id, board);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.boardService.deleteOne(id);
  }
}
