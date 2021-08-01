import { OmitType } from "@nestjs/swagger";
import { UpdateCustomerDto } from "./update-customer.dto";

export class CreateCustomerDto extends OmitType(UpdateCustomerDto, ["_id"] as const) {}