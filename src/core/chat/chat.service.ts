import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ChatEntity, MessageEntity } from './chat.entity';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './types/create.type';
import { UserService } from '../user/user.service';
import { FeedEntity } from '../feed/feed.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
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

  async getChatService(
    user: UserEntity,
    receiver: UserEntity,
  ): Promise<ChatEntity> {
    const where = [];
    where.push({ members: user });
    where.push({ members: receiver });
    const chats = await this.chatRepository.find({
      relations: ['members', 'members.avatar', 'messages', 'messages.sender'],
    });
    let chat: ChatEntity = null;

    chats.map((c) => {
      const u = c.members.filter((m) => m.id === user.id)[0];
      const r = c.members.filter((m) => m.id === receiver.id)[0];
      if (!!u && !!r) {
        chat = c;
      }
    });

    if (!!chat) {
      console.log(chat);
      return chat;
    } else {
      const newChat = await this.chatRepository.create();
      try {
        newChat.members = [user, receiver];
        await this.chatRepository.save(newChat);
        return newChat;
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async createMessageService(msg: any): Promise<MessageEntity> {
    console.log(msg);
    const newMessage = this.messageRepository.create();
    const chat = await this.chatRepository.findOne({ id: msg.chat });
    const sender = await this.userService.getUserByAttrService({
      id: msg.sender.id,
    });

    newMessage.chat = chat;
    newMessage.sender = sender;
    newMessage.message = msg.message;

    await this.messageRepository.save(newMessage);
    console.log(newMessage);
    return newMessage;
  }
}
