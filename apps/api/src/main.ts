// TODO: remove this comment after testing
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser middleware
  app.use(cookieParser());

  // auto generate API doc
  const config = new DocumentBuilder()
    .setTitle('Domain Check API')
    .setDescription('API for the app')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((error: unknown) => {
  console.error('Unhandled error during bootstrap:', error);
});
