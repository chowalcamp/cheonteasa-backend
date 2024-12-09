import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 사용자 생성 예시
  createUser(name: string, phone: string): Promise<User> {
    const user = this.userRepository.create({ name, phone });
    return this.userRepository.save(user);
  }

  // 모든 사용자 조회 예시
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
