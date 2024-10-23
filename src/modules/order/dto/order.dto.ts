import { PickType } from '@nestjs/swagger';
import { OrderEntity } from 'src/modules/order/entities/order.entity';

export class CreateOrderDto extends PickType(OrderEntity, []) {}

export class UpdateOrderDto extends PickType(OrderEntity, [
  'status',
  'total',
  'user_id',
]) {}
