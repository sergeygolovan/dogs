import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';
import { isMongoId } from 'class-validator';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  private readonly logger = new Logger(CustomersController.name);

  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFiles() files?,
  ) {
    this.logger.log({ dto: createCustomerDto });

    let avatar: Express.Multer.File = files?.avatar?.[0];

    return this.customersService.create(createCustomerDto, avatar);
  }

  @Put()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async update(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadedFiles() files?,
  ) {
    this.logger.log({ dto: updateCustomerDto });

    let avatar: Express.Multer.File = files?.avatar?.[0];
    return this.customersService.update(updateCustomerDto, avatar);
  }

  @Get()
  getAll() {
    this.logger.log(`Запрос на получение списка клиентов...`);
    return this.customersService.getAll();
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {

    if (! isMongoId(id)) {
      throw new BadRequestException(`Указан некорректный идентификатор документа! (${id})`)
    }

    return this.customersService.getOne(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {

    if (! isMongoId(id)) {
      throw new BadRequestException(`Указан некорректный идентификатор документа! (${id})`)
    }

    return this.customersService.delete(id);
  }
}
