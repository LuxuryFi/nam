import { PickType } from '@nestjs/swagger';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

export class CreateProductDto extends PickType(ProductEntity, [
  'expired_date',
  'description',
  'stock_quantity',
  'user_id',
  'product_name',
  'image',
  'price',
  'status',
]) {}

export class UpdateProductDto extends PickType(ProductEntity, [
  'expired_date',
  'description',
  'stock_quantity',
  'user_id',
  'product_name',
  'image',
  'price',
  'status',
]) {}
