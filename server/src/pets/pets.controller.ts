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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@ApiTags('petabase')
@Controller('pets')
export class PetsController {

  private readonly logger = new Logger(PetsController.name);

  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async create(@Body() createPetDto: CreatePetDto, @UploadedFiles() files?) {

    this.logger.log('Создание записи о питомце...')
    this.logger.log({ dto: createPetDto });

    let image: Express.Multer.File = files?.image?.[0];

    return this.petsService.create(createPetDto, image);
  }

  @Put()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  async update(@Body() updatePetDto: UpdatePetDto, @UploadedFiles() files?) {

    this.logger.log('Обновление записи о питомце...')
    this.logger.log({ dto: updatePetDto });

    let image: Express.Multer.File = files?.image?.[0];
    return this.petsService.update(updatePetDto, image);
  }


  @Get()
  getAll() {
    return this.petsService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.petsService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.petsService.getOne(id);
  }

  @ApiParam({
    name: "id",
    required: true
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.petsService.delete(id);
  }
}
