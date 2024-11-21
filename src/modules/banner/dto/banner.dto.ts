import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BannerEntity } from 'src/modules/banner/entities/banner.entity';

export class CreateBannerDto extends PickType(BannerEntity, [
  'area_id',
  'image_url',
  'created_at',
  'updated_at',
  'description',
  'display_order',
  'title',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  end_date?: string; // Make expired_date optional if not passed

  @ApiProperty({ required: false })
  @IsOptional()
  start_date?: string; // Make expired_date optional if not passed
}

export class UpdateBannerDto extends PickType(BannerEntity, [
  'area_id',
  'status',
  'created_at',
  'updated_at',
  'description',
  'display_order',
  'title',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  end_date?: string; // Make expired_date optional if not passed

  @ApiProperty({ required: false })
  @IsOptional()
  start_date?: string; // Make expired_date optional if not passed
}
