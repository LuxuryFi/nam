import { PickType } from '@nestjs/swagger';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';

export class CreateDiscountDto extends PickType(DiscountEntity, [
  'discount_code',
  'discount_name',
  'discount_percentage',
  'status',
  'created_at',
  'updated_at',
  'start_date',
  'end_date',
  'description',
  'price',
]) {}

export class UpdateDiscountDto extends PickType(DiscountEntity, [
  'discount_code',
  'discount_name',
  'discount_percentage',
  'status',
  'created_at',
  'updated_at',
  'start_date',
  'end_date',
  'description',
  'price',
]) {}
