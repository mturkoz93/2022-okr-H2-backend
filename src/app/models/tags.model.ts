import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, Document, SchemaTypes, Types } from 'mongoose';
import { User } from './users.model';

export type TagDocument = Tag & Document;

/**
 * timestamps: true ise createdAt ve updatedAt alanları otomatik oluşur.
 */
@Schema()
export class Tag {

  @Prop([{ type: Types.ObjectId, ref: 'user', required: true }])
  user_id!: User;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date; // You can use Date here.

  @Prop()
  expiresAt: Date;

  @Prop()
  isValid: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
