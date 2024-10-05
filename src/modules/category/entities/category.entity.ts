import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({
    type: String,
  })
  @Column({
    type: 'char',
    length: 256,
  })
  description: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 7,
    default: 'public',
  })
  category_name: string;

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
}
