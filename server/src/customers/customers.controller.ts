import {
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

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  private readonly logger = new Logger(CustomersController.name);

  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFiles() files?,
  ) {
    this.logger.log({ dto: createCustomerDto });

    let image: Express.Multer.File = files?.image?.[0];

    return this.customersService.create(createCustomerDto, image);
  }

  @Put()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async update(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadedFiles() files?,
  ) {
    this.logger.log({ dto: updateCustomerDto });

    let image: Express.Multer.File = files?.image?.[0];
    return this.customersService.update(updateCustomerDto, image);
  }

  @Get()
  getAll() {
    return this.customersService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.customersService.search(query);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.customersService.getOne(id);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.customersService.delete(id);
  }
}
