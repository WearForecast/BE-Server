import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
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
