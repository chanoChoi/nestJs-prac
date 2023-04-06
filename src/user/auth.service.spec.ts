import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entitiy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UserService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
});
