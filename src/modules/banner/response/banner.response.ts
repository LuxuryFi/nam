import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBannerResponse {
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
    description: 'Banner Name',
  })
  banner_name: string;

  @IsString()
  @ApiProperty({
    description: 'Banner code',
  })
  banner_code: string;

  @IsString()
  @ApiProperty({
    description: 'Price',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Banner Percentage',
  })
  banner_percentage: number;


  @IsString()
  @IsBoolean()
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

export class GetBannerResponse {
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
    description: 'Banner Name',
  })
  banner_name: string;


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

export class UpdateBannerResponse {
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
    description: 'Banner Name',
  })
  banner_name: string;


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
