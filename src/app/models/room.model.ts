import { ObjectID } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './users.model';
// import { Message } from './message.model';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true, collection: 'rooms' })
export class Room {
  _id: ObjectID | string;

  @Prop({ required: false })
  name?: string;

  /* @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  user_id!: User; */

  @Prop({ required: true, default: 1 })
  type!: number;

  @Prop({ required: false, default: true })
  status?: boolean;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId },
        text: { type: String },
        senderId: { type: Types.ObjectId, ref: 'user', required: true },
        receiverId: { type: Types.ObjectId, ref: 'user', required: true },
        status: { type: Number }
      },
    ],
  })
  messages: [];

  /* @Prop({
    type:[{ ref: 'message', required: true }]
  })
  messages: Message[]; */

  @Prop({ type: [Types.ObjectId], ref: 'user' })
  participants: User[];

  /* @Prop({ type: Types.ObjectId, ref: 'user' })
  receiverId: User; */

  /* @Prop({ type: [Types.ObjectId], ref: 'tag' })
  tags!: Tag[]; */
}

export const RoomSchema = SchemaFactory.createForClass(Room);
