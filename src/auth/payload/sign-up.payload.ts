import { IsEmail, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpPayload {
  @IsString()
  @ApiProperty({
    description: '이름',
    type: String,
  })
  name!: string;

  @IsEmail()
  @ApiProperty({
    description: '이메일',
    type: String,
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  password!: string;

  @IsInt()
  @ApiProperty({
    description: '생년',
    type: Number,
  })
  birthyear: number;

  @IsString()
  @ApiProperty({
    description: '지역',
    type: String,
  })
  region: string;

  @IsString()
  @ApiProperty({
    description: '성별',
    type: String,
  })
  gender: string;
}
