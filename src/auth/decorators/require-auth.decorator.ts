import { SetMetadata } from '@nestjs/common';

// GET 요청이지만 인증이 필요한 경우 사용
export const RequireAuth = () => SetMetadata('requireAuth', true);

