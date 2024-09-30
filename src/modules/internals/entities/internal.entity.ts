import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('internal_user')
export class InternalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
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
    default: 'internal',
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
