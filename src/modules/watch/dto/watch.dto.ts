import { PickType } from '@nestjs/swagger';
import { WatchEntity } from '../entities/watch.entity';

export class CreateWatchDto extends PickType(WatchEntity, [
  'product_id',
] as const) {}
