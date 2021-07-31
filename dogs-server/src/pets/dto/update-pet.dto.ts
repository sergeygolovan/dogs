import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsMongoId, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdatePetDto {

    @Allow()
    @IsMongoId()
    _id: string;

    @Allow()
    @IsString()
    name: string;

    @Allow()
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: any;

    @Allow()
    @IsNumberString()
    rating?: number;

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