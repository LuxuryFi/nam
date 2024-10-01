import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Email',
  })
  email: string;
}

export class GetUserResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Email',
  })
  email: string;
}

export class UpdateUserResponse {
  @IsNumber()
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Email',
  })
  email: string;
}
