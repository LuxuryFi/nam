import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banner')
export class BannerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 255,
  })
  title: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 255,
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
  link_url: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 255,
    default: '',
  })
  image_url: string;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
  })
  display_order: number;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
  })
  area_id: number;

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
