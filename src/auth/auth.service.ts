import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async register(registerDto: RegisterDto) {
    const { username, password, email, name, phone } = registerDto;

    // 중복 확인
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, ...(email ? [{ email }] : [])],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      }
      if (existingUser.email === email) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      name,
      phone,
      role: 'MEMBER', // 기본 권한은 MEMBER
    });

    await this.userRepository.save(user);

    // 비밀번호 제외하고 반환
    const { password: _, ...result } = user;
    return result;
  }

  // 로그인
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 사용자 조회
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    // JWT 토큰 생성
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // 사용자 정보 조회 (토큰 검증용)
  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    const { password: _, ...result } = user;
    return result;
  }
}
