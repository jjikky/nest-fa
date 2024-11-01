import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });

    it('/name?name=jikky (GET)', () => {
      return request(app.getHttpServer())
        .get('/name?name=jikky')
        .expect(200)
        .expect('jikky');
    });

    it('로그인', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ username: 'useruser7', password: 'password7' })
        .expect(201);
    });
  });

  describe('BoardController', () => {
    it('게시글 가져오기', () => {
      return request(app.getHttpServer()).get('/board').expect(200);
    });
  });
});
