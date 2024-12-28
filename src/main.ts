import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';  // Importación correcta de morgan

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Habilitar CORS en NestJS
  app.enableCors();

  // Usar morgan para logging de solicitudes
  app.use(morgan('dev'));  // Usa morgan correctamente para registrar solicitudes HTTP

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const configService = app.get(ConfigService);

  // Configuración de Swagger
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Taskrr API')
    .setDescription('Aplicacion de gestion de tareas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Escucha en el puerto
  await app.listen(configService.get('PORT'));

  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
