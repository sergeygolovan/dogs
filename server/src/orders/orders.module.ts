import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { Order, OrderSchema } from './schema/order.schema';
import { CustomersModule } from 'src/customers/customers.module';
import { PetsModule } from 'src/pets/pets.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema },]),
    FilesModule,
    PetsModule,
    CustomersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
