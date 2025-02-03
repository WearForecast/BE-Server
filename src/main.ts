import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Enable CORS

  const config = new DocumentBuilder()
    .setTitle('WearForecast Server')
    .setDescription('WearForecast API description')
    .setVersion('1.0')
    .addTag('Wearforecast')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
