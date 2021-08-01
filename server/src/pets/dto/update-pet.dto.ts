import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsMongoId, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import * as mongoose from "mongoose";

export class UpdatePetDto {

    @Allow()
    @IsMongoId()
    _id: mongoose.Schema.Types.ObjectId;

    @Allow()
    @IsOptional()
    @IsString()
    name?: string;

    @Allow()
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: any;

    @Allow()
    @IsOptional()
    @IsNumberString()
    rating?: number = 0;

    @Allow()
    @IsOptional()
    @IsString()
    breed?: string;

    @Allow()
    @IsOptional()
    @IsString()
    feed?: string;

    @Allow()
    @IsOptional()
    @IsString()
    character?: string;

    @Allow()
    @IsOptional()
    @IsString()
    diseases?: string;

    @Allow()
    @IsOptional()
    @IsString()
    comments?: string;
}