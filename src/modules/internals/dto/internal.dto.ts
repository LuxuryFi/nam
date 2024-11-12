import { PickType } from '@nestjs/swagger';
import { InternalEntity } from '../entities/internal.entity';

export class CreateUserDto extends PickType(InternalEntity, [
  'email',
  'password',
  'type',
  'address',
  'phone',
  'name',
  'url',
  'role',
  'created_at',
  'gender',
]) {}

export class UpdateUserDto extends PickType(InternalEntity, [
  'email',
  'type',
  'address',
  'phone',
  'name',
  'url',
  'role',
  'status',
  'gender',
]) {}
