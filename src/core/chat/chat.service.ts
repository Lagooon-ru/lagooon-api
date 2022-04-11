import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  async getChatsService(user: UserEntity): Promise<ChatEntity[]> {
    return await this.chatRepository
      .createQueryBuilder()
      .select([])
      .where('"id" IN (:...members)', {
        members: user.id,
      })
      .groupBy('"members"')
      .getRawMany<ChatEntity>();
  }
}
