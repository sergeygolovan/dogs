import { OmitType } from "@nestjs/swagger";
import { Allow, IsString } from "class-validator";
import { UpdateCustomerDto } from "./update-customer.dto";

export class CreateCustomerDto extends OmitType(UpdateCustomerDto, ["_id"] as const) {
    @Allow()
    @IsString()
    registrationDate: string;
}