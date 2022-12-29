import {ObjectID} from 'bson';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import { User } from './users.model';

@Schema()
export class Room {
  _id: ObjectID | string;

  @Prop({required: true, maxlength: 20, minlength: 5})
  name: string;

  @Prop()
  messages: [];

  @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
  connectedUsers: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room)