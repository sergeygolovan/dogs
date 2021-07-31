import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: Number, required: false, default: 0 })
  rating: number;

  @Prop({ address: String, required: true })
  address: string;

  @Prop({ type: String, required: true})
  phone: string;

  @Prop({ required: false })
  comments: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
