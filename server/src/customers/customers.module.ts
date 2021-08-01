import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { Customer, CustomerSchema } from './schema/customer.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema },]),
    FilesModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
