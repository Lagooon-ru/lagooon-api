import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './service/mail/mail.module';
import { FirebaseModule } from './service/firebase/firebase.module';
import { Connection } from 'typeorm';
import 'dotenv/config';
import { join } from 'path';
import { MediaModule } from './core/media/media.module';
import { PostModule } from './core/post/post.module';
import { StoryModule } from './core/story/story.module';
import { AppController } from './app.controller';
import { ChatModule } from './core/chat/chat.module';
import { SearchModule } from './api/search/search.module';
import { CloudinaryModule } from './service/cloudinary/cloudinary.module';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '0'),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    TypeOrmModule.forFeature([AppEntity]),
    UserModule,
    AuthModule,
    MailModule,
    FirebaseModule,
    MediaModule,
    PostModule,
    StoryModule,
    ChatModule,
    CloudinaryModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
