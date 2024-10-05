import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiscountResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Discount Name',
  })
  discount_name: string;

  @IsString()
  @ApiProperty({
    description: 'Discount code',
  })
  discount_code: string;

  @IsString()
  @ApiProperty({
    description: 'Price',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Discount Percentage',
  })
  discount_percentage: number;


  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: boolean;


  @ApiProperty({
    description: 'Create at',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Update at',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Start time',
  })
  start_date: Date;

  @ApiProperty({
    description: 'End time',
  })
  end_date: Date;
}

export class GetDiscountResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Discount Name',
  })
  discount_name: string;

 
  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: boolean;


  @ApiProperty({
    description: 'Create time',
  })
  created_at: Date;
}

export class UpdateDiscountResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Discount Name',
  })
  discount_name: string;

 
  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: boolean;


  @ApiProperty({
    description: 'Create time',
  })
  created_at: Date;
}
