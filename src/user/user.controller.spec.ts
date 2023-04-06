import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entitiy';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'password',
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: 'password' } as User]),
      // remove: () => {},
      // update: () => {}
    };

    fakeAuthService = {
      // signup: (email: string, password: string) => ,
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users: User[] = await controller.findAllUsers('asdf@asdf.com');

    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: null };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'password' } as CreateUserDto,
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
