import { ApiProperty, OmitType } from "@nestjs/swagger";
import { UpdatePetDto } from "./update-pet.dto";

export class CreatePetDto extends OmitType(UpdatePetDto, ["_id"] as const) {}