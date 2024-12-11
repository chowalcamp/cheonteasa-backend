import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    if (this.authService.validateUser(username, password)) {
      const token = this.authService.generateToken();
      res.cookie('authToken', token, { httpOnly: true });
      return res.send('로그인 성공');
    } else {
      return res.status(401).send('로그인 실패');
    }
  }
}
