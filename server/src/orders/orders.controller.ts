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
import { isMongoId } from 'class-validator';
  import { ObjectId } from 'mongoose';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import { OrdersService } from './orders.service';
  
  @ApiTags('orders')
  @Controller('orders')
  export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);
  
    constructor(private readonly ordersService: OrdersService) {}
  
    @Post()
    async create(
      @Body() createOrderDto: CreateOrderDto,
    ) {
      this.logger.log({ dto: createOrderDto });
  
      return this.ordersService.create(createOrderDto);
    }
  

    @Put()
    async update(
      @Body() updateOrderDto: UpdateOrderDto,
    ) {
      this.logger.log({ dto: updateOrderDto });
  
      return this.ordersService.update(updateOrderDto);
    }
  
    
    @Get()
    getAll() {
      return this.ordersService.getAll();
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

      return this.ordersService.getOne(id);
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

      return this.ordersService.delete(id);
    }
  }
  