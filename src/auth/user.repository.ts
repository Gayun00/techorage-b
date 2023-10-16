import { DataSource, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: User) {
    const createdUser = this.create(user);
    try {
      await this.save(createdUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
