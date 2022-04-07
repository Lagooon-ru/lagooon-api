import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
// import { configService } from './config/config.service';
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

// const firebase = configService.getFirebase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // const adminConfig: ServiceAccount = firebase;

  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  //   databaseURL: '',
  // });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log(
    `...............................  SERVER STARTED AT ${process.env.PORT}!  ............................`,
  );
});
