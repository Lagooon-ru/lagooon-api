import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatEntity } from './chat.entity';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto } from './types/create.type';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [ChatEntity])
  @UseGuards(GqlAuthGuard)
  async chats(@CurrentUser() user: UserEntity) {
    return this.chatService.getChatsService(user);
  }

  @Mutation(() => ChatEntity)
  @UseGuards(GqlAuthGuard)
  async createChat(
    @CurrentUser() user: UserEntity,
    @Args('arg') arg: CreateChatDto,
  ) {
    return this.chatService.createChatService(user, arg);
  }
}
