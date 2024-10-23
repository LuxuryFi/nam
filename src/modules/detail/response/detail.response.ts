import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetDetailResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsNumber()
  @ApiProperty({
    description: 'Product_id',
  })
  product_id: number;

  @IsNumber()
  @ApiProperty({
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    description: 'Order id',
  })
  order_id: number;

  @ApiProperty({
    description: 'price',
  })
  price: number;
}
