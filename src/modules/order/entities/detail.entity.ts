import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class DetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
    nullable: true,
  })
  product_id: number;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
    nullable: true,
  })
  amount: number;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
    nullable: true,
  })
  order_id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'integer',
    length: 7,
  })
  price: number;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
