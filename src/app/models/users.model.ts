import { Token } from './tokens.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, SchemaTypes, Types } from 'mongoose';
import { Tag } from './tags.model';

export type UserDocument = User & Document;

/**
 * timestamps: true ise createdAt ve updatedAt alanları otomatik oluşur.
 */
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  email?: string;

  @Prop()
  description?: string;

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

  /* @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date; */
}

export const UserSchema = SchemaFactory.createForClass(User);
