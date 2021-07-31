import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: Number, required: false, default: 0 })
  rating: number;

  @Prop({ required: false })
  breed: string;

  @Prop({ required: false })
  feed: string;

  @Prop({ required: false })
  character: string;

  @Prop({ required: false })
  diseases: string;

  @Prop({ required: false })
  comments: string;

  @Prop({ required: false })
  owners: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
