import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfilePayload {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '이름',
    type: String,
  })
  name?: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    description: '생년',
    type: Number,
  })
  birthyear?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '지역',
    type: String,
  })
  region?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '성별',
    type: String,
  })
  gender?: string;
}
