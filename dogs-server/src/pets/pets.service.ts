import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FilesService, FileType } from 'src/files/files.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schema/pet.schema';

@Injectable()
export class PetsService {

  private readonly logger = new Logger(PetsService.name);

  constructor(
    @InjectModel(Pet.name) private readonly petModel: Model<PetDocument>,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    image?: Express.Multer.File,
  ): Promise<Pet> {

    if (image) {

      createPetDto.image = this.fileService.createFile(FileType.IMAGE, image);
      
      // `data:${
      //   image.mimetype
      // };base64, ${image.buffer.toString('base64')}`;
    }

    const pet = await this.petModel.create({
      ...createPetDto,
    });

    return pet;
  }

  async getAll(): Promise<Pet[]> {
    const pets = await this.petModel.find();
    return pets;
  }

  async getOne(id: ObjectId): Promise<Pet> {
    const track = await this.petModel.findById(id);
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.petModel.findByIdAndDelete(id);
    return track._id;
  }

  async search(query: string): Promise<Pet[]> {
    const tracks = await this.petModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async update(updatePetDto: UpdatePetDto, image?: Express.Multer.File): Promise<Pet> {
    if (image) {
      updatePetDto.image = `data:${
        image.mimetype
      };base64, ${image.buffer.toString('base64')}`;
    }

    const pet = await this.petModel.findByIdAndUpdate(updatePetDto._id, {
      ...updatePetDto,
    });

    return pet;
  }
}
