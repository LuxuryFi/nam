import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { Auth } from 'src/decorators/auth.decorator';
import { sendResponse } from 'src/utils/response.util';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import {
  CreateOrderResponse,
  GetOrderResponse,
  UpdateOrderResponse,
} from './response/order.response';
@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get Public Order',
  })
  async find(): Promise<object> {
    return this.ordersService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Order',
  })
  @ApiOkResponse({
    type: GetOrderResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.ordersService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Auth()
  @Post()
  @ApiOperation({
    summary: 'Create Public Order',
  })
  @ApiOkResponse({
    type: CreateOrderResponse,
  })
  async create(
    @Body() data: CreateOrderDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const user_id = req.user.id;
      const carts = await this.ordersService.getCartDetail(user_id);
      console.log('carts', req.user);
      console.log('order', user_id);
      if (carts.length <= 0) {
        return sendResponse(
          res,
          HttpStatusCodes.CREATED,
          null,
          'Cart is empty',
        ); // Use 201 Created for successful user creation
      }
      const orderdetail = [];
      const payload = {
        user_id,
        created_at: new Date(),
      };

      const order = await this.ordersService.store(payload);
      let total: any = 0;
      carts.forEach((cart) => {
        total = cart.amount * cart.price;
        orderdetail.push({
          product_id: cart.product_id,
          price: cart.price,
          order_id: order.id,
          amount: cart.amount,
        });
      });

      console.log('Test', carts);
      const result = await this.ordersService.bulkInsert(user_id, orderdetail);
      console.log('Test 2');

      const updateOrder = await this.ordersService.update(order.id, {
        total: total,
      });

      if (updateOrder) {
        return sendResponse(res, HttpStatusCodes.CREATED, updateOrder, null); // Use 201 Created for successful user creation
      }
      // const result = await this.ordersService.store(payload);
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

  @Put(':id')
  @ApiOperation({
    summary: 'Update Public Order',
  })
  @ApiOkResponse({
    type: UpdateOrderResponse,
  })
  async update(
    @Body() data: UpdateOrderDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { user_id, status } = data;

      const payload = {
        status,
        user_id,
        created_at: new Date(),
      };

      const result = await this.ordersService.update(id, payload);
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
      const users = await this.ordersService.find({
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

      const result = await this.ordersService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
