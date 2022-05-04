import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity, MessageEntity } from './chat.entity';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity]), UserModule],
  providers: [ChatService, ChatResolver, ChatGateway],
})
export class ChatModule {}
