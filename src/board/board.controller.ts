import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('board')
export class BoardController {
  @Get()
  findAll() {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `find id : ${id}`;
  }

  @Post()
  create(@Body() board: any) {
    return 'create';
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() board: any) {
    return `update id : ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `delete id : ${id}`;
  }
}
