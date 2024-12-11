import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string): boolean {
    return username === 'user' && password === 'password';
  }

  generateToken(): string {
    return 'your-auth-token';
  }
}
