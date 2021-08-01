import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/customers/schema/customer.schema';
import { Order } from 'src/orders/schema/order.schema';

export type PetDocument = Pet & mongoose.Document;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: mongoose.Schema.Types.ObjectId[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);
