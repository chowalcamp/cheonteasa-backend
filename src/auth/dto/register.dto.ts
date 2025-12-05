import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '사용자 아이디 (로그인용)',
    example: 'admin',
  })
  @IsNotEmpty({ message: 'username은 필수 항목입니다.' })
  @IsString({ message: 'username은 문자열이어야 합니다.' })
  @MinLength(4, { message: 'username은 최소 4자 이상이어야 합니다.' })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'password는 필수 항목입니다.' })
  @IsString({ message: 'password는 문자열이어야 합니다.' })
  @MinLength(6, { message: 'password는 최소 6자 이상이어야 합니다.' })
  password: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  @IsNotEmpty({ message: 'name은 필수 항목입니다.' })
  @IsString({ message: 'name은 문자열이어야 합니다.' })
  name: string;

  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'email은 올바른 이메일 형식이어야 합니다.' })
  email?: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1234-5678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'phone은 문자열이어야 합니다.' })
  phone?: string;
}

