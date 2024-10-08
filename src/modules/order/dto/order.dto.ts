import { PickType } from '@nestjs/swagger';
import { OrderEntity } from 'src/modules/order/entities/order.entity';

export class CreateOrderDto extends PickType(OrderEntity, [
  'user_id',
  'status',
]) {}

export class UpdateOrderDto extends PickType(OrderEntity, [
  'status',
  'user_id',
  'total',
]) {}
