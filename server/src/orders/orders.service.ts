import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { CustomerDocument } from 'src/customers/schema/customer.schema';
import { FilesService, FileType } from 'src/files/files.service';
import { PetsService } from 'src/pets/pets.service';
import { PetDocument } from 'src/pets/schema/pet.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly petsService: PetsService,
    private readonly customersService: CustomersService,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto
  ): Promise<Order> {

    const order = await this.orderModel.create({
      ...createOrderDto,
    });

    const customerDoc = (await this.customersService.getOne(createOrderDto.customer)) as CustomerDocument;
    await customerDoc.updateOne({ $push: { orders: order._id } });

    for (let _id of createOrderDto.pets) {
      let petDoc = (await this.petsService.getOne(_id)) as PetDocument;
      await petDoc.updateOne({ $push: { orders: order._id } });
    }

    return order;
  }

  async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  async getOne(id: ObjectId): Promise<Order> {
    const track = await this.orderModel.findById(id).populate("customer", ["_id", "name", "image", "contacts"]).populate("pets", ["_id", "name", "image"]);
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.orderModel.findByIdAndDelete(id);
    return track._id;
  }

  async search(query: string): Promise<Order[]> {
    const tracks = await this.orderModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { _id, pets, ...dto} = updateOrderDto;

    if (pets) {
        Object.assign(dto, {$set : { pets }});
    }

    const order = await this.orderModel.findByIdAndUpdate(_id, {
      ...dto
    });

    return order;
  }
}
