import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/ create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signIn(authCredentialDto: AuthCredentialsDto) {
    // const { name, email } = authCredentialDto;
  }
}
