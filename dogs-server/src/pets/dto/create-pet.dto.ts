import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto {
    name: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    image?: any;

    rating?: number;

    breed?: string;

    feed?: string;

    character?: string;

    diseases?: string;

    comments?: string;
}