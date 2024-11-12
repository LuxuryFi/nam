import { PickType } from '@nestjs/swagger';
import { BannerEntity } from 'src/modules/banner/entities/banner.entity';

export class CreateBannerDto extends PickType(BannerEntity, [
  'area_id',
  'image_url',
  'created_at',
  'updated_at',
  'start_date',
  'end_date',
  'description',
  'display_order',
  'title',
]) {}

export class UpdateBannerDto extends PickType(BannerEntity, [
  'area_id',
  'image_url',
  'status',
  'created_at',
  'updated_at',
  'start_date',
  'end_date',
  'description',
  'display_order',
  'title',
]) {}
