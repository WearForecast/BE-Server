import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    // @Query('date') date: string,
    // @Query('time') time: string,
    @Query('nx') nx: number,
    @Query('ny') ny: number,
  ) {
    return this.weatherService.getWeather(nx, ny);
  }
}