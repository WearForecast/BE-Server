import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { configModule } from './modules/config.module';
import { CommonModule } from 'src/common/common.module';
import { WeatherModule } from 'src/weather/weather.module';
import { RecommendationModule } from 'src/recommendation/recommendation.module';
import { EmailModule } from 'src/email/email.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    configModule,
    CommonModule,
    WeatherModule,
    RecommendationModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
