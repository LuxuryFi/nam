import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
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

  @ApiProperty()
  @IsBoolean()
  @Column({
    type: 'boolean',
    nullable: true,
    default: 1,
  })
  gender: boolean;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 7,
    default: 'public',
  })
  type: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 256,
    default: 'public',
  })
  address: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 256,
    default: '',
  })
  phone: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 256,
    default: '',
  })
  reset_password_token: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 256,
    default: '',
  })
  url: string;

  @ApiProperty()
  @IsString()
  @Column({
    type: 'char',
    length: 256,
    default: 'public',
  })
  reset_password_expire: string;

  @IsString()
  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  password: string;

  @IsString()
  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  name: string;

  @ApiProperty()
  @IsBoolean()
  @Column({
    type: 'boolean',
    nullable: true,
    default: 1,
  })
  status: boolean;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken?: string;

  @ApiProperty()
  @Column({
    type: 'timestamp', // Use 'timestamp' or 'datetime'
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
