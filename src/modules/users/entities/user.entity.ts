import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  id: number;

  @IsEmail()
  @ApiProperty({
    type: String,
  })
  @Column({
    type: 'char',
    length: 256,
  })
  email: string;

  @Column({
    type: 'char',
    length: 256,
    default: 'public',
  })
  type: string;

  @IsString()
  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken?: string;
}
