import { Module } from '@nestjs/common';
import { LocationService } from './location.service';

@Module({
  providers: [LocationService],
  exports: [LocationService], // WeatherModule에서 사용할 수 있도록 export
})
export class LocationModule {}
