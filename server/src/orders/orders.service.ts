import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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


  /**
   * Создание записи о заказе в БД
   * @param createOrderDto 
   * @returns 
   */
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


  /**
   * Получение списка всех заказов из БД
   * @returns 
   */
  async getAll(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }


  /**
   * Получение информации о выбранном заказе из БД
   * @param id 
   * @returns 
   */
  async getOne(id: ObjectId): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate("customer", ["_id", "name", "image", "contacts"])
      .populate("pets", ["_id", "name", "image"]);

    return order;
  }


  /**
   * Удаление информации о заказе из БД
   * @param id 
   * @returns 
   */
  async delete(id: ObjectId): Promise<ObjectId> {
    const order = await this.orderModel
      .findById(id);

    if (!order) {
      throw new BadRequestException(`Невозможно удалить заказ с несуществующим идентификатором! (${id})`)
    }

    const customerDoc = (await this.customersService.getOne(order.customer)) as CustomerDocument;
    await customerDoc.updateOne({ $pull: { orders: { $eq: order._id } } });

    for (let _id of order.pets) {
      let petDoc = (await this.petsService.getOne(_id)) as PetDocument;
      await petDoc.updateOne({ $pull: { orders: { $eq: order._id } } });
    }

    return order._id;
  }

  /**
   * Обновление информации о заказе в БД
   * @param updateOrderDto 
   * @returns 
   */
  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { _id, ...dto} = updateOrderDto;

    const order = await this.orderModel.findByIdAndUpdate(_id, {
      ...dto
    });

    return order;
  }
}
