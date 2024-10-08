import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsBoolean()
  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @ApiProperty()
  @IsNumber()
  @Column({
    type: 'integer',
    default: 0,
  })
  total: number;

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
    type: Date,
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

}
