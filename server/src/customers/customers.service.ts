import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FilesService, FileType } from 'src/files/files.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schema/customer.schema';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    private readonly fileService: FilesService,
  ) {}

  /**
   * Создание записи о клиенте в БД
   * @param createCustomerDto
   * @param avatar
   * @returns
   */
  async create(
    createCustomerDto: CreateCustomerDto,
    avatar?: Express.Multer.File,
  ): Promise<Customer> {
    if (avatar) {
      createCustomerDto.avatar = this.fileService.createFile(
        FileType.IMAGE,
        avatar,
      );
    }

    const customer = await this.customerModel.create({
      ...createCustomerDto,
    });

    return customer;
  }

  /**
   * Получение списка всех клиентов из БД
   * @returns
   */
  async getAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find(null, ['-__v']);

    return customers;
  }

  /**
   * Получение информации о выбранном клиенте из БД
   * @param id
   * @returns
   */
  async getOne(id: ObjectId): Promise<Customer> {
    const customer = await this.customerModel.findById(id, ['-__v']);
    //.populate("pets", ["_id", "name", "avatar", "rating"]);

    if (!customer) {
      throw new BadRequestException(
        `Данные о клиенте с указанным идентификатором не обнаружены! (${id})`,
      );
    }

    return customer;
  }

  /**
   * Удаление записи о клиенте из БД
   * @param id
   * @returns
   */
  async delete(id: ObjectId): Promise<ObjectId> {
    const customer = await this.customerModel
      .findById(id, ['pets', 'orders'])
      .populate('pets', '_id')
      .populate('orders', '_id');

    if (!customer) {
      throw new BadRequestException(
        `Невозможно удалить клиента с несуществующим идентификатором! (${id})`,
      );
    }

    if (customer.pets.length) {
      throw new BadRequestException(
        `Невозможно удалить клиента, для которого были заведены питомцы!`,
      );
    }

    if (customer.orders.length) {
      throw new BadRequestException(
        `Невозможно удалить клиента, для которого были сформированы заказы!`,
      );
    }

    await customer.deleteOne();

    return customer._id;
  }

  /**
   * Обновление информации о клиенте ы БД
   * @param updateCustomerDto
   * @param avatar
   * @returns
   */
  async update(
    updateCustomerDto: UpdateCustomerDto,
    avatar?: Express.Multer.File,
  ): Promise<Customer> {
    if (avatar) {
      updateCustomerDto.avatar = this.fileService.createFile(
        FileType.IMAGE,
        avatar,
      );
    }

    const { _id, ...dto } = updateCustomerDto;

    const customer = await this.customerModel.findByIdAndUpdate(_id, {
      ...dto,
    });

    return customer;
  }
}
