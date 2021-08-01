import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { Pet, PetSchema } from './schema/pet.schema';
import { CustomersModule } from 'src/customers/customers.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    FilesModule,
    CustomersModule
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService]
})
export class PetsModule {}
