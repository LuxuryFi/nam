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

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty({ type: () => ProductEntity })
  @ManyToOne(() => ProductEntity, (product) => product.favorites, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' }) // Specify the column name
  product: ProductEntity;
}
