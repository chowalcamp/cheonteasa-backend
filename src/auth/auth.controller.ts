import { Controller, Post, Body, Res, Get, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { RequireAuth } from './decorators/require-auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다. 기본 권한은 MEMBER입니다.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 아이디 또는 이메일' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
    description: '사용자 인증을 수행하고 JWT 토큰을 쿠키에 저장합니다.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '아이디 또는 비밀번호가 잘못되었습니다.',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    // 쿠키에 토큰 저장
    res.cookie('authToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    });

    return result;
  }

  @Public()
  @Post('logout')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그아웃',
    description: '쿠키에서 JWT 토큰을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authToken');
    return { message: '로그아웃 성공' };
  }

  @RequireAuth()
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 정보 조회 (인증 필요)',
    description:
      '현재 로그인한 사용자의 정보를 조회합니다. GET 요청이지만 인증이 필요합니다.',
  })
  @ApiResponse({ status: 200, description: '사용자 정보 조회 성공' })
  @ApiResponse({ status: 401, description: '인증되지 않은 사용자' })
  async getMe(@CurrentUser() user: any) {
    return this.authService.getUserById(user.userId);
  }
}
