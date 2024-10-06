import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 100,
    default: 'CREATED',
  })
  status: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 7,
  })
  total: string;

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
