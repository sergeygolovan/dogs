import { Injectable, Logger } from '@nestjs/common';
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
    @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    image?: Express.Multer.File,
  ): Promise<Customer> {

    if (image) {
      createCustomerDto.image = this.fileService.createFile(FileType.IMAGE, image);
    }

    const customer = await this.customerModel.create({
      ...createCustomerDto,
    });

    return customer;
  }

  async getAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find();
    return customers;
  }

  async getOne(id: ObjectId): Promise<Customer> {
    const track = await this.customerModel.findById(id).populate("pets", ["_id", "name", "image"]);
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.customerModel.findByIdAndDelete(id);
    return track._id;
  }

  async search(query: string): Promise<Customer[]> {
    const tracks = await this.customerModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async update(updateCustomerDto: UpdateCustomerDto, image?: Express.Multer.File): Promise<Customer> {
   
    if (image) {
        updateCustomerDto.image = this.fileService.createFile(FileType.IMAGE, image);
    }

    const { _id, ...dto } = updateCustomerDto;

    const customer = await this.customerModel.findByIdAndUpdate(_id, {...dto,});

    return customer;
  }
}
