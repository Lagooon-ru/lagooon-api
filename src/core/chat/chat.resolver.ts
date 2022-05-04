import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatEntity } from './chat.entity';
import { ChatService } from './chat.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../api/auth/guards/graphql.guard';
import { UserEntity } from '../user/user.entity';
import { CreateChatDto, GetChatDto } from './types/create.type';
import { UserService } from '../user/user.service';

@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

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

  @Mutation(() => ChatEntity)
  @UseGuards(GqlAuthGuard)
  async getChat(@CurrentUser() user: UserEntity, @Args('arg') arg: GetChatDto) {
    const receiver = await this.userService.getUserByAttrService({
      id: arg.receiverId,
    });

    if (!receiver) {
      throw new BadRequestException('No User');
    }

    return this.chatService.getChatService(user, receiver);
  }
}
