import { Token } from './tokens.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, SchemaTypes, Types } from 'mongoose';
import { Tag } from './tags.model';
import { Room } from './room.model';

export type UserDocument = User & Document;

/**
 * timestamps: true ise createdAt ve updatedAt alanları otomatik oluşur.
 */
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop()
  clientId: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  gender?: number;

  @Prop()
  email?: string;

  @Prop()
  about?: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;

  @Prop({ type: [Types.ObjectId], ref: 'tag' })
  tags!: Tag[];

  @Prop()
  role?: number;

  @Prop({ type: [Types.ObjectId], ref: 'token' })
  tokens: Token[];

  @Prop({ default: true })
  accept: boolean;

  @Prop()
  avatar?: string;
  
  @Prop()
  level?: string;

  @Prop({type: [{type: Types.ObjectId, ref: 'Room'}]})
  joinedRooms?: Room[];

  /* @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date; */
}

export const UserSchema = SchemaFactory.createForClass(User);
