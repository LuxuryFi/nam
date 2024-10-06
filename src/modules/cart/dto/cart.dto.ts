import { PickType } from '@nestjs/swagger';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';

export class CreateCartDto extends PickType(CartEntity, [
  'amount',
  'product_id',
  'user_id',
  'price',
]) { }

export class UpdateCartDto extends PickType(CartEntity, [
  'product_id',
  'amount',
  'price',
]) { }
