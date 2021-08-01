import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsMongoId, IsNumberString, IsOptional, IsString } from "class-validator";
import * as mongoose from "mongoose";

export class UpdateCustomerDto {
    @Allow()
    @IsMongoId()
    _id: mongoose.Schema.Types.ObjectId;

    @Allow()
    @IsString()
    name: string;

    @Allow()
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: any;

    @Allow()
    @IsNumberString()
    rating?: number = 0;

    @Allow()
    @IsOptional()
    @IsNumberString()
    discount?: number = 0;

    @Allow()
    @IsOptional()
    @IsString()
    address?: string;

    @Allow()
    @IsString()
    contacts: string;

    @Allow()
    @IsOptional()
    @IsString()
    comments?: string;
}