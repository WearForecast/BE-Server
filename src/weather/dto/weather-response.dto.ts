import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
  @ApiProperty({
    description: '강수확률',
    type: Number,
  })
  POP: number;

  @ApiProperty({
    description: '강수형태',
    type: String,
  })
  PTY: string;

  @ApiProperty({
    description: '하늘상태',
    type: String,
  })
  SKY: string;

  @ApiProperty({
    description: '일 최저기온',
    type: Number,
  })
  TMN: number;

  @ApiProperty({
    description: '일 최고기온',
    type: Number,
  })
  TMX: number;

  @ApiProperty({
    description: '풍속',
    type: Number,
  })
  WSD: number;

  @ApiProperty({
    description: '습도',
    type: Number,
  })
  REH: number;

  @ApiProperty({
    description: '기온',
    type: Number,
  })
  T1H: number;
}

export class WeatherResponseDto {
  @ApiProperty({
    description: '총 날씨정보',
    type: WeatherDto,
  })
  weather: WeatherDto;
}
