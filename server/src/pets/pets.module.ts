import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet, PetSchema } from './schema/pet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}]),
    FilesModule
  ],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
