import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';

export class CreateDiscountDto extends PickType(DiscountEntity, [
  'discount_code',
  'discount_name',
  'discount_percentage',
  'description',
  'price',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  start_date?: string; // Make expired_date optional if not passed

  @ApiProperty({ required: false })
  @IsOptional()
  end_date?: string; // Make expired_date optional if not passed
}

export class UpdateDiscountDto extends PickType(DiscountEntity, [
  'discount_code',
  'discount_name',
  'discount_percentage',
  'status',
  'description',
  'price',
]) {
  @ApiProperty({ required: false })
  @IsOptional()
  start_date?: string; // Make expired_date optional if not passed

  @ApiProperty({ required: false })
  @IsOptional()
  end_date?: string; // Make expired_date optional if not passed
}
