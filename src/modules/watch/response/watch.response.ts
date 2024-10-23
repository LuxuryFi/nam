import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchResponse {
  @ApiProperty({
    description: 'Product Id',
  })
  product_id: number;
}
