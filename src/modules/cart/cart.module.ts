import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ProductEntity } from '../discount/entities/product.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ConfigModule],
  controllers: [CartController],
  providers: [CartService, ProductEntity,],
  exports: [CartService],
})
export class CartModule { }
