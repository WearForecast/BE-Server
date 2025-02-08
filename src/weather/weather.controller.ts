import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { WeatherResponseDto } from './dto/weather-response.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: '날씨 정보 가져오기' })
  @ApiOkResponse({ type: WeatherResponseDto})
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getUserWeather(@Request() req) {
    const { user } = req;

    if (!user || !user.region) {
      throw new Error('User region not found');
    }

    const weatherData = await this.weatherService.getWeatherByLocation(
      user.region,
    );

    return { weather: weatherData };
  }
}
