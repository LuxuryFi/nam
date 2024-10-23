import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { DetailEntity } from 'src/modules/detail/entities/detail.entity';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { WatchEntity } from 'src/modules/watch/entities/watch.entity';
import {
  BaseEntity,
  Column,
  Entity,
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
  @IsString()
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
  @Transform(() => Date)
  @Column({
    type: 'date',
    nullable: true,
  })
  expired_date: Date;

  @OneToMany(() => WatchEntity, (watch) => watch.product)
  watches: WatchEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorites: FavoriteEntity[];

  @OneToMany(() => DetailEntity, (detail) => detail.product)
  details: FavoriteEntity[];
}
