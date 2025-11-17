import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다.',
  })
  @ApiBody({ type: User })
  @ApiResponse({
    status: 201,
    description: '사용자가 성공적으로 생성되었습니다.',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  create(@Body() user: User) {
    return this.userService.createUser(user.name, user.phone);
  }

  @Get()
  @ApiOperation({
    summary: '전체 사용자 조회',
    description: '모든 사용자 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
