import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discount')
export class DiscountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    default: '',
  })
  discount_name: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    default: '',
  })
  discount_code: string;

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
  description: string;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
  })
  discount_percentage: number;

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
  start_date: Date;

  @ApiProperty()
  @Type(() => Date)
  @Column({
    type: 'date',
    nullable: true,
  })
  end_date: Date;
}
