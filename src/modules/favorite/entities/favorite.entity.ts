import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class FavoriteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'integer',
  })
  user_id: number;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
  })
  product_id: number;
}
