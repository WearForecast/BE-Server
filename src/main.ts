import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://wearforecast.vercel.app',
  }); // Enable CORS
  app.use(cookieParser()); // Enable CookieParser
  app.useGlobalFilters(new HttpExceptionFilter()); // Enable ExceptionFilter

  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Enable ValidationPipe

  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('WearForecast Server')
    .setDescription('WearForecast API Description')
    .setVersion('1.0')
    .addTag('Wearforecast API List')
    .addBearerAuth(
      // Add bearer token authentication(swagger)
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      // Keep Authorization after page refresh
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
