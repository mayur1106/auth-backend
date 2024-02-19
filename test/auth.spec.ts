import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

describe('Authentication', () => {
  let app: INestApplication;
  let userRepository: UsersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userRepository = moduleFixture.get<UsersService>(UsersService);
  });
  describe('User Signup', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test18@example.com',
        password: 'Mayur@123q',
        firstName: 'John',
        lastName: 'doe',
      };

      console.log('server test ', app.getHttpServer());
      const response = await request(process.env.HOST_URL)
        .post('api/v1/auth/register')
        .send(userData)
        .expect(201);

      const deleteUser = await request(process.env.HOST_URL)
        .post('api/v1/auth/delete')
        .send({ email: userData.email })
        .expect(201);
      console.log(deleteUser);
    });
  });

  describe('User Login', () => {
    it('should log in an existing user', async () => {
      const response = await request(process.env.HOST_URL)
        .post('api/v1/auth/login')
        .send({ email: 'mayurv3.th@gmail.com', password: 'Mayur@123' })
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
        }),
      );
    });

    it('should return error for incorrect credentials', async () => {
      const email = 'test@example.com';
      const password = 'incorrectpassword';

      const response = await request(process.env.HOST_URL)
        .post('api/v1/auth/login')
        .send({ email: 'mayurv3.th@gmail.com', password: 'Mayur@123q' })
        .expect(400);
    });
  });
});
