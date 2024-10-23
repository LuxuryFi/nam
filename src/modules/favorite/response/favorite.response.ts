import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteResponse {
  @ApiProperty({
    description: 'Product Id',
  })
  product_id: number;
}
