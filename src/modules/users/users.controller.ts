import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
} from './response/user.response';
import { UsersService } from './users.service';
@Controller('users')
@ApiTags('Public User')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Public User',
  })
  async find(): Promise<object> {
    return this.usersService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public User',
  })
  @ApiOkResponse({
    type: GetUserResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.usersService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public User',
  })
  @ApiOkResponse({
    type: CreateUserResponse,
  })
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

  @Put()
  @ApiOperation({
    summary: 'Update Public User',
  })
  @ApiOkResponse({
    type: UpdateUserResponse,
  })
  async update(@Body() data: UpdateUserDto) {
    const { email, id } = data;
    const payload = {
      email,
    };

    return this.usersService.update(id, payload);
  }
}
