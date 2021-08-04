import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Pet } from 'src/pets/schema/pet.schema';

export type CustomerDocument = Customer & mongoose.Document;

@Schema()
export class Customer {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  registrationDate: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: Number, required: false, default: 0 })
  rating: number;

  @Prop({ type: Number, required: false, default: 0 })
  discount: number;

  @Prop({ address: String, required: false })
  address: string;

  @Prop({ type: String, required: true })
  contacts: string;

  @Prop({ required: false })
  comments: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }] })
  pets: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: mongoose.Schema.Types.ObjectId[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
