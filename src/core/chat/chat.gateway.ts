import {
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import 'dotenv/config';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@WebSocketGateway(8001, {
  transports: ['websocket'],
})
export class ChatGateway {
  private readonly users: any[];
  constructor(private readonly chatService: ChatService) {
    this.users = [];
  }

  @WebSocketServer()
  server;

  @SubscribeMessage('connected')
  handleConnect(client: Socket, id: string): void {
    console.log(id);
    console.log(client.id);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: any): void {
    console.log(client.id, 'DISCONNECTED');
  }

  @SubscribeMessage('update-users')
  retrieveUsers(): void {
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, message: any) {
    const msg = await this.chatService.createMessageService(message);
    console.log(msg);
    this.server.emit('message', msg);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
