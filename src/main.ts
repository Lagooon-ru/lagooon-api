import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { configService } from './config/config.service';
const port = configService.getPort();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(
    `...............................  SERVER STARTED AT ${port}!  ............................`,
  );
});
