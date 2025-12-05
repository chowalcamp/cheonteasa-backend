import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '사용자 아이디',
    example: 'admin',
  })
  @IsNotEmpty({ message: 'username은 필수 항목입니다.' })
  @IsString({ message: 'username은 문자열이어야 합니다.' })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'password는 필수 항목입니다.' })
  @IsString({ message: 'password는 문자열이어야 합니다.' })
  password: string;
}
