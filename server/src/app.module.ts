import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/dogs',
      //'mongodb+srv://sergeygolovan:9Q6df6uuwdDwJzBh@cluster0.usgdn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useFindAndModify: false
      }
    ),
    PetsModule, 
    CustomersModule, 
    OrdersModule, 
    FilesModule
  ],
})
export class AppModule {}
