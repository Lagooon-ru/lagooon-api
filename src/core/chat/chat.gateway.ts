import {
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8081, { transports: ['websocket'] })
export class ChatGateway {
  private readonly users: any[];
  constructor(private readonly chatService: ChatService) {
    this.users = [];
  }

  @WebSocketServer()
  server;

  @SubscribeMessage('connected')
  handleConnect(client: any): void {
    console.log(client);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: any): void {
    console.log(client);
  }

  @SubscribeMessage('update-users')
  retrieveUsers(): void {
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: any,
  ): void {
    console.log(client);
    console.log(message);
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
