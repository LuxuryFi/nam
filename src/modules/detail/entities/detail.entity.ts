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

@Entity('order_detail')
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
  @Column({
    type: 'integer',
  })
  price: number;

  @ApiProperty({ type: () => ProductEntity })
  @ManyToOne(() => ProductEntity, (product) => product.details, { eager: true })
  @JoinColumn({ name: 'product_id' }) // Specify the column name
  product: ProductEntity;
}
