import { PickType } from '@nestjs/swagger';
import { FavoriteEntity } from '../entities/favorite.entity';
export class CreateFavoriteDto extends PickType(FavoriteEntity, [
  'product_id',
] as const) {}
