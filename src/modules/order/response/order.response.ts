import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Total',
  })
  total: string;

  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: string;

  @ApiProperty({
    description: 'Create at',
  })
  created_at: Date;


  @ApiProperty({
    description: 'User id',
  })
  user_id: number;
}

export class GetOrderResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Total',
  })
  total: string;

  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: string;

  @ApiProperty({
    description: 'Create at',
  })
  created_at: Date;

  @ApiProperty({
    description: 'User id',
  })
  user_id: number;
}

export class UpdateOrderResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Total',
  })
  total: string;

  @IsString()
  @ApiProperty({
    description: 'status',
  })
  status: string;

  @ApiProperty({
    description: 'Create at',
  })
  created_at: Date;


  @ApiProperty({
    description: 'User id',
  })
  user_id: number;
}
