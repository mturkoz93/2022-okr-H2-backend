import { RoomDocument } from './../../models/room.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('room') private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getUserRooms(userId: any) {
    return await this.roomModel.find({
      participants: { $in: userId }
    })
    .slice('messages', -1) // mesajların en sonuncusunu getirir
    .populate({ // participants içerisinde bulunan tags'lerin ilişkili olduğu tablodan bilgilerini alır
      path: 'participants',
      populate: {
        path: 'tags',
        model: 'tag'
      } 
   }).populate("messages.receiverId").populate("messages.senderId").exec() as any;

    /* console.log(rooms)
    return rooms?.map((room: any) => {
      return {
        ...room,
        participantIds: room.participants.map(item => item._id)
      }
    }) */
  }
}
