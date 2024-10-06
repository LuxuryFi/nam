import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { ConfigModule } from '../config/config.module';
import { ProductEntity } from '../discount/entities/product.entity';
import { DetailEntity } from './entities/detail.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CartEntity, ProductEntity, DetailEntity]), ConfigModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule { }
