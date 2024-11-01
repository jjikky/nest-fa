import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { BoardEntity } from './infrastructure/db/entities/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<BoardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(BoardEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
  });

  it('boardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  //게시글 전체 조회
  // describe('게시글 전체 조회', () => {
  //   it('게시글 전체 조회', async () => {
  //     const result = await boardService.findAll();
  //     expect(result).toEqual([]);
  //   });
  // });

  describe('게시글 조회', () => {
    it('2번 게시글 작성자는 jikky다', async () => {
      jest.spyOn(boardRepository, 'findOne').mockResolvedValue({
        id: 1,
        userId: 2,
        contents: 'test',
        user: {
          id: 2,
          username: 'jikky',
          password: '1234',
          boards: [],
          boardCount: 0,
        },
      } as BoardEntity);
      const result = await boardService.findOne(2);
      expect(result.user.username).toEqual('jikky');
    });
  });
});
