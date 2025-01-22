import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: '생년월일',
    type: Date,
  })
  birthday: Date;

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