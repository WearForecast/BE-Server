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
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    configModule,
    CommonModule,
    WeatherModule,
    RecommendationModule,
    EmailModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = {
          store: redisStore,
          // Change redis:// to rediss:// for TLS
          url: configService.get('REDIS_URL').replace('redis://', 'rediss://'),
          ttl: 3600,
          socket: {
            tls: true,
            rejectUnauthorized: false,
          },
        };

        console.log('Redis configuration:', {
          url: redisConfig.url.replace(/\/\/.*@/, '//***:***@'),
          ttl: redisConfig.ttl,
          tls: true,
        });

        return redisConfig;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
