import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

/**
 * timestamps: true ise createdAt ve updatedAt alanları otomatik oluşur.
 */
@Schema({ timestamps: true, collection: 'tags' })
export class Tag {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
