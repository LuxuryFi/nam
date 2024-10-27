import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @IsNumber()
  @Column({
    type: 'integer',
  })
  price: number;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty({ type: () => ProductEntity })
  @ManyToOne(() => ProductEntity, (product) => product.discounts, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' }) // Specify the column name
  product: ProductEntity;
}
