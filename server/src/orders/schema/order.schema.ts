import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Customer } from 'src/customers/schema/customer.schema';
import { Pet } from 'src/pets/schema/pet.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, required: true })
  dateTimeFrom: string;

  @Prop({ type: String, required: true })
  dateTimeTo: string;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: Number, required: false, default: 0 })
  deposit: number;

  @Prop({ type: Number, required: false, default: 0 })
  discount: number;

  @Prop({ required: false })
  comments: string;

  @Prop({ required: false, default: 0 })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  customer: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }] })
  pets: mongoose.Schema.Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
