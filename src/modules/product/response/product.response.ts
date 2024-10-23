import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductResponse {
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
    description: 'Product Name',
  })
  product_name: string;

  @IsString()
  @ApiProperty({
    description: 'Price',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Stock quanity',
  })
  stock_quantity: number;

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
    description: 'Expired time',
  })
  expired_date: Date;
}

export class GetProductResponse {
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
    description: 'Product Name',
  })
  product_name: string;

  @IsString()
  @ApiProperty({
    description: 'Price',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Stock quanity',
  })
  stock_quantity: number;

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
    description: 'Expired time',
  })
  expired_date: Date;
}

export class UpdateProductResponse {
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
    description: 'Product Name',
  })
  product_name: string;

  @IsString()
  @ApiProperty({
    description: 'Price',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Stock quanity',
  })
  stock_quantity: number;

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
    description: 'Expired time',
  })
  expired_date: Date;
}
