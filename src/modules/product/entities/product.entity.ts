import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { DetailEntity } from 'src/modules/detail/entities/detail.entity';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { InternalEntity } from 'src/modules/internals/entities/internal.entity';
import { WatchEntity } from 'src/modules/watch/entities/watch.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    default: '',
  })
  product_name: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    default: '',
  })
  description: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 255,
    default: '',
  })
  image: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 7,
  })
  price: string;

  @ApiProperty()
  @Column({
    type: 'char',
    length: 7,
    default: '',
  })
  stock_quantity: string;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
    nullable: true,
  })
  user_id: number;

  @ApiProperty()
  @Column({
    type: 'boolean',
    nullable: true,
    default: 1,
  })
  status: boolean;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ApiProperty()
  @Column({
    type: Date,
    nullable: true,
  }) // This will ensure it's parsed as a Date if it's a valid string representation of a date
  expired_date: Date; // or use Date if you expect Date objects

  @OneToMany(() => WatchEntity, (watch) => watch.product)
  watches: WatchEntity[];

  @ManyToOne(() => InternalEntity, (user) => user.product)
  @JoinColumn({ name: 'user_id' })
  user: InternalEntity; // Foreign key reference

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity; // Foreign key reference

  @OneToMany(() => DiscountEntity, (discounts) => discounts.product)
  discounts: DiscountEntity[];

  @OneToMany(() => CartEntity, (carts) => carts.product)
  carts: DiscountEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorites: FavoriteEntity[];

  @OneToMany(() => DetailEntity, (detail) => detail.product)
  details: FavoriteEntity[];
}
