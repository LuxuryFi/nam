import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateCartDto } from './dto/cart.dto';

import { CartService } from './cart.service';
import {
  CreateCartResponse,
  GetCartResponse
} from './response/cart.response';
@Controller('carts')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartsService: CartService) { }

  @Get('')
  @ApiOperation({
    summary: 'Get Public Cart',
  })
  async find(): Promise<object> {
    return this.cartsService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Cart',
  })
  @ApiOkResponse({
    type: GetCartResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.cartsService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public Cart',
  })
  @ApiOkResponse({
    type: CreateCartResponse,
  })
  async create(@Body() data: CreateCartDto, @Res() res: Response) {
    try {
      const { product_id, amount, price, user_id } = data;

      const payload = {
        product_id,
        amount,
        price,
        user_id,
        created_at: new Date(),
      };

      const validateCart = await this.cartsService.validateCart(payload);
      if (validateCart.amount > 0) {
        payload.amount = payload.amount + validateCart.amount;
        const result = await this.cartsService.update(validateCart.id, payload);
        return sendResponse(res, HttpStatusCodes.CREATED, result, null); // Use 201 Created for successful user creation
      }

      const result = await this.cartsService.store(payload);
      return sendResponse(res, HttpStatusCodes.CREATED, result, null); // Use 201 Created for successful user creation
    } catch (err) {
      console.error('Error:', err); // Use console.error for logging errors
      return sendResponse(
        res,
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        null,
        err.message,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const users = await this.cartsService.find({
        where: {
          id,
        },
      });

      if (users.length === 0) {
        return sendResponse(
          res,
          HttpStatusCodes.NOT_FOUND,
          null,
          Errors.USER_EMAIL_NOT_FOUND.message,
        );
      }

      const result = await this.cartsService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
