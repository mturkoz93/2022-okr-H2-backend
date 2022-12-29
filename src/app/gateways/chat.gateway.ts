import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { WsGuard } from '../guard/ws.guard';
import { Room } from '../models/room.model';
import { User } from '../models/users.model';

@WebSocketGateway(8081, { cors: '*' })
export class ChatGateway {
  constructor(
    @InjectModel('room') private readonly roomModel: Model<Room>,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}

  
  @WebSocketServer()
  server;

  afterInit() {
    console.log('Gateway initialized');
  }

  async handleConnection(client: Socket) {
    console.log('Connect', client.id)
    const user = await this.userModel.findOne({clientId: client.id});
    if (user) {
      this.server.emit('users-changed', {user: user.username, event: 'left'});
      user.clientId = null;
      await this.userModel.findByIdAndUpdate(user._id, user);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('disconnect...')
    const user = await this.userModel.findOne({clientId: client.id});
    if (user) {
      this.server.emit('users-changed', {user: user.username, event: 'left'});
      user.clientId = null;
      await this.userModel.findByIdAndUpdate(user._id, user);
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('joined_general_chat')
  joinedGeneralChat(client: Socket): void {
    const username = client["user"].username
    const id = client["user"]._id
    console.log(client["user"].username);
    console.log(client["user"]._id);
    this.server.emit('general_chat', {text: `${username} katıldı.`, username, _id: id, type: 'join' });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send_message_general_chat')
  sendMessageGeneralChat(client: Socket, data): void {
    console.log('client', client["user"])
    const username = client["user"].username
    const id = client["user"]._id

    this.server.emit('receive_message_general_chat', {text: data.text, username, ownerId: id, type: 'message' });
  }


  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, payload: any): void {
    console.log(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('enter-chat-room') 
  async enterChatRoom(client: Socket, data: { nickname: string, roomId: string }) {
    let user = await this.userModel.findOne({nickname: data.nickname});
    if (!user) {
      user = await this.userModel.create({nickname: data.nickname, clientId: client.id});
    } else {
      user.clientId = client.id;
      user = await this.userModel.findByIdAndUpdate(user._id, user, {new: true});
    }
    client.join(data.roomId);
    client.broadcast.to(data.roomId)
      .emit('users-changed', {user: user.username, event: 'joined'}); 
  }

  @SubscribeMessage('leave-chat-room') 
  async leaveChatRoom(client: Socket, data: { nickname: string, roomId: string }) {
    const user = await this.userModel.findOne({nickname: data.nickname});
    client.broadcast.to(data.roomId).emit('users-changed', {user: user.username, event: 'left'}); 
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message') 
  async addMessage(client: Socket, message: any) {
    message.owner = await this.userModel.findOne({clientId: client.id});
    message.created = new Date();
    /* message = await this.messagesModel.create(message);
    this.server.in(message.room as string).emit('message', message); */
  }
}
