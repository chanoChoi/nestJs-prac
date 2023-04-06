import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(email: string, password: string) {
    const usersOrEmpty = await this.userService.find(email);
    if (usersOrEmpty.length) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return this.userService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, sotredHash]: string[] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (sotredHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
