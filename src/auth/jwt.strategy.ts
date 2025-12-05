import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

export interface JwtPayload {
  sub: string; // userId (UUID)
  username: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // 쿠키에서 토큰 추출
          return request?.cookies?.authToken;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 토큰도 지원
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-this', // 환경변수로 관리
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Invalid token');
    }
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
