import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Public 데코레이터가 있는 경우 인증 스킵
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // RequireAuth 데코레이터가 있는 경우 무조건 인증 필요
    const requireAuth = this.reflector.getAllAndOverride<boolean>('requireAuth', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requireAuth) {
      return super.canActivate(context);
    }

    // GET 요청은 인증 불필요 (자동으로 Public 처리)
    const request = context.switchToHttp().getRequest();
    if (request.method === 'GET') {
      return true;
    }

    return super.canActivate(context);
  }
}

