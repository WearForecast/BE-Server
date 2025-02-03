import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';

@Module({
  imports: [ConfigModule.forRoot(), LocationModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
