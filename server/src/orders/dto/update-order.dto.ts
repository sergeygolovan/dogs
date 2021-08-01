import { OmitType } from "@nestjs/swagger";
import { Allow, IsDateString, IsIn, IsMongoId, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import * as mongoose from "mongoose";
import { CreateOrderDto } from "./create-order.dto";

export class UpdateOrderDto extends OmitType(CreateOrderDto, ["customer", "pets"] as const) {
    @Allow()
    @IsMongoId()
    _id: mongoose.Schema.Types.ObjectId;

    @Allow()
    @IsIn([1, 2])
    status: number;
}