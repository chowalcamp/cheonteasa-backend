import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '사용자 생성 (관리자 전용)',
    description: '새로운 사용자를 생성합니다. 관리자만 사용 가능합니다.',
  })
  @ApiBody({ type: User })
  @ApiResponse({
    status: 201,
    description: '사용자가 성공적으로 생성되었습니다.',
    type: User,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  create(@Body() user: User) {
    return this.userService.createUser(user.name, user.phone);
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: '전체 사용자 조회 (관리자 전용)',
    description: '모든 사용자 목록을 조회합니다. 관리자만 사용 가능합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
    type: [User],
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  @ApiResponse({ status: 403, description: '권한이 없습니다.' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
