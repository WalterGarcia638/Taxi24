import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite todas las solicitudes de cualquier origen (puedes restringirlo según sea necesario)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Si necesitas enviar cookies o encabezados de autenticación, configúralo como `true`
  });

  const config = new DocumentBuilder()
  .setTitle('Tu Aplicación')
  .setDescription('Descripción de la API de tu aplicación')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
