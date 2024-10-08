import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { PrismaClientExceptionFilter } from '@/common/filters';
import { EnvService } from '@/modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder().setTitle('Reg Helper API').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('document', app, document);

  await app.listen(port);
}

bootstrap();
