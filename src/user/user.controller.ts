import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.createUser(user.name, user.phone);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
