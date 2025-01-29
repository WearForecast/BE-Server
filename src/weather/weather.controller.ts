import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('region') region: string,
  ) {
    if (!region) {
      throw new Error('Region is required');
    }

    return this.weatherService.getWeatherByLocation(region);
  }
}
