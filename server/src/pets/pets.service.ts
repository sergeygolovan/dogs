import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { CustomerDocument } from 'src/customers/schema/customer.schema';
import { FilesService, FileType } from 'src/files/files.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schema/pet.schema';

@Injectable()
export class PetsService {
  private readonly logger = new Logger(PetsService.name);

  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
    private readonly customerService: CustomersService,
    private readonly fileService: FilesService,
  ) {}


  /**
   * Создание нового питомца в БД
   * @param createPetDto 
   * @param image 
   * @returns экземпляр класса Pet, созданный в БД
   */
  async create(
    createPetDto: CreatePetDto,
    image?: Express.Multer.File,
  ): Promise<Pet> {

    // Если прикреплен файл с изображением, производим его сохранение 
    if (image) {
      createPetDto.image = this.fileService.createFile(FileType.IMAGE, image);
    }

    // Создаем новую запись о питомце в БД
    const pet = await this.petModel.create({...createPetDto});
    
    // Обновляем список питомцев для указанного клиента
    const customerDoc = (await this.customerService.getOne(createPetDto.customer)) as CustomerDocument;
    await customerDoc.updateOne({ $push: { pets: pet._id } });

    return pet;
  }


  /**
   * Получение списка всех питомцев с краткой информацией
   * @returns список всех питомцев
   */
  async getAll(): Promise<Pet[]> {
    const pets = await this.petModel
      .find(null, ["_id", "name", "image", "comments", "rating"]);
    return pets;
  }

  
  /**
   * Получение полной информации о выбранном питомце
   * @param id 
   * @returns 
   */
  async getOne(id: ObjectId): Promise<Pet> {
    const pet = await this.petModel
      .findById(id)
      .populate("customer", ["_id", "name", "image", "contacts", "rating"]);

    return pet;
  }


  /**
   * Удаление записи о выбранном питомце
   * @param id 
   * @returns 
   */
  async delete(id: ObjectId): Promise<ObjectId> {
    const pet = await this.petModel.findById(id, ["orders"]).populate("orders", "_id");

    if (!pet) {
      throw new BadRequestException(`Невозможно удалить питомца с несуществующим идентификатором! (${id})`)
    }

    if (pet.orders.length) {
      throw new BadRequestException(`Невозможно удалить питомца, для которого были сформированы заказы! (${pet.orders.join(', ')})`)
    }

    return pet._id;
  }


  /**
   * Поиск питомца по части имени в БД
   * @param query 
   * @returns 
   */
  async search(query: string): Promise<Pet[]> {

    const tracks = await this.petModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return tracks;
  }


  /**
   * Обновление информации о питомце
   * @param updatePetDto 
   * @param image 
   * @returns 
   */
  async update(
    updatePetDto: UpdatePetDto,
    image?: Express.Multer.File,
  ): Promise<Pet> {
    
    if (image) {
      updatePetDto.image = this.fileService.createFile(FileType.IMAGE, image);
    }

    const { _id, ...dto } = updatePetDto;

    const pet = await this.petModel.findByIdAndUpdate(_id, { ...dto });

    return pet;
  }
}
