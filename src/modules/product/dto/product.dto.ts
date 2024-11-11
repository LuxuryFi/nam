import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

export class CreateProductDto extends PickType(ProductEntity, [
  'description',
  'stock_quantity',
  'product_name',
  'image',
  'price',
  'status',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  expired_date?: string; // Make expired_date optional if not passed
}

export class UpdateProductDto extends PickType(ProductEntity, [
  'description',
  'stock_quantity',
  'product_name',
  'image',
  'price',
  'status',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  expired_date?: string; // Make expired_date optional if not passed
}
