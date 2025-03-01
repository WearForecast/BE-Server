import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from 'src/weather/weather.module';
import { WeatherService } from 'src/weather/weather.service';
import { LocationService } from 'src/weather/location/location.service';

@Module({
  imports: [HttpModule, WeatherModule],
  controllers: [RecommendationController],
  providers: [RecommendationService, WeatherService, LocationService],
})
export class RecommendationModule {}
