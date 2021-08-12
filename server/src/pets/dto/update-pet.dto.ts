import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsIn, IsInt, IsMongoId, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
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
    avatar?: any;

    @Allow()
    @IsOptional()
    @IsIn(["male", "female"])
    sex?: string;

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