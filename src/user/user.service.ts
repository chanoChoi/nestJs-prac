import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { where } from 'sequelize/types';
import * as assert from 'assert';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  create(email: string, password: string) {
    const newUser = this.repo.create({ email, password });

    return this.repo.save(newUser);
  }

  async findOne(id: number) {
    // id 가 null 일경우 tabel내의 첫번째 tuple을 가져온다.
    try {
      assert(typeof id === 'number');
      const user = await this.repo.findOneByOrFail({ id });
      return user;
    } catch (e: any) {
      console.error(e);
      throw new NotFoundException(`Entity not found with id ${id}`);
    }
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
