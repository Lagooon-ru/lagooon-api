import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './types/create.type';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private readonly userService: UserService,
  ) {}

  async getChatsService(user: UserEntity): Promise<ChatEntity[]> {
    return await this.chatRepository.find();
  }

  async createChatService(
    user: UserEntity,
    chat: CreateChatDto,
  ): Promise<ChatEntity> {
    const { members, title, description, type } = chat;
    const newChat = await this.chatRepository.create();
    try {
      newChat.members = members;
      newChat.type = type;
      newChat.title = title;
      newChat.description = description;
      await this.chatRepository.save(newChat);
      return newChat;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
