import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { configModule } from './modules/config.module';
import { CommonModule } from 'src/common/common.module';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [AuthModule, UsersModule, configModule, CommonModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
