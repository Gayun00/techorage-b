import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(user: User) {
    const registeredUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!registeredUser) return this.userRepository.createUser(user);
    return registeredUser;
  }
}
