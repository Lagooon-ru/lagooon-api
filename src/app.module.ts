import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './core/user/user.module';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './service/mail/mail.module';
import { FirebaseModule } from './service/firebase/firebase.module';
import { Connection } from 'typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'Lagooon',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    AuthModule,
    MailModule,
    FirebaseModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
