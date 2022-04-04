import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const port = configService.getPort();
const firebase = configService.getFirebase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const adminConfig: ServiceAccount = firebase;

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: '',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(
    `...............................  SERVER STARTED AT ${port}!  ............................`,
  );
});
