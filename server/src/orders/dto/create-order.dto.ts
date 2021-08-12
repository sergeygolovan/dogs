import {
  Allow,
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsIn,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateOrderDto {
  @Allow()
  @IsString()
  dateTimeFrom: string;

  @Allow()
  @IsString()
  dateTimeTo: string;

  @Allow()
  @IsNumber()
  rate: number;

  @Allow()
  @IsOptional()
  @IsNumber()
  deposit?: number = 0;

  @Allow()
  @IsOptional()
  @IsNumber()
  discount?: number = 0;

  @Allow()
  @IsOptional()
  @IsString()
  comments?: string;

  @Allow()
  @IsMongoId()
  customer: mongoose.Schema.Types.ObjectId;

  @Allow()
  @IsMongoId({
    each: true,
  })
  pets: mongoose.Schema.Types.ObjectId[];
}
