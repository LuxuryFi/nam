import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryResponse {
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
    description: 'Category Name',
  })
  category_name: string;


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

export class GetCategoryResponse {
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
    description: 'Category Name',
  })
  category_name: string;

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

export class UpdateCategoryResponse {
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
    description: 'Category Name',
  })
  category_name: string;

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
