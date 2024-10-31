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
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { userInfo } from 'os';

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
  @UseGuards(JwtAuthGuard)
  async create(@UserInfo() userInfo, @Body('contents') contents: string) {
    if (!userInfo) {
      throw new UnauthorizedException();
    }
    return await this.boardService.create({
      userId: userInfo.id,
      contents,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) board: UpdateBoardDto,
  ) {
    return await this.boardService.updateOne(userInfo.id, id, board);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return await this.boardService.deleteOne(userInfo.id, id);
  }
}
