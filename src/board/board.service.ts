import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    { id: 1, title: '1', contents: '1' },
    { id: 2, title: '2', contents: '2' },
    { id: 3, title: '3', contents: '3' },
  ];

  findAll() {
    return this.boards;
  }

  findOne(id: number) {
    return this.boards.find((board) => board.id === id);
  }

  create(data: any) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  updateOne(id: number, board: any) {
    const findBoard = this.boards.find((board) => board.id === id);
    if (findBoard) {
      Object.assign(findBoard, board);
      return findBoard;
    }
  }

  deleteOne(id: number) {
    const index = this.boards.findIndex((board) => board.id === id);
    if (index !== -1) {
      this.boards.splice(index, 1);
    }
    return null;
  }

  private getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
