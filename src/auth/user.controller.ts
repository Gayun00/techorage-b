import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createUser(@GetUser() user: User) {
    return this.userService.createUser(user);
  }
}
