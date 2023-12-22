import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 3001,
  //   },
  // });
  // app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
