import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'password',
  'type',
]) {}

export class UpdateUserDto extends PickType(UserEntity, ['email']) {}
