import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(): Promise<object> {
    return this.usersService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<object> {
    return this.usersService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const { password, email, type } = data;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const payload = {
      password: hashedPassword,
      email,
      type,
    };

    return this.usersService.store(payload);
  }

  @Put(':id')
  async update(@Body() data: UpdateUserDto, @Param() id: number) {
    const { email } = data;

    const payload = {
      email,
    };

    return this.usersService.update(id, payload);
  }
}
