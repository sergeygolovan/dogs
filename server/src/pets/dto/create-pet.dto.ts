import { OmitType } from "@nestjs/swagger";
import { Allow, IsMongoId, IsString } from "class-validator";
import { UpdatePetDto } from "./update-pet.dto";
import * as mongoose from "mongoose";

export class CreatePetDto extends OmitType(UpdatePetDto, ["_id"] as const) {

    @Allow()
    @IsString()
    name: string;

    @Allow()
    @IsMongoId()
    customer: mongoose.Schema.Types.ObjectId;
}