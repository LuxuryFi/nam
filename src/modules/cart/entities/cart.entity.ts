import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class CartEntity extends BaseEntity {
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
  user_id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 7,
  })
  price: string;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

}
