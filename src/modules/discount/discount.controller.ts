import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';

import { DiscountService } from './discount.service';
import {
  CreateDiscountResponse,
  GetDiscountResponse,
  UpdateDiscountResponse,
} from './response/discount.response';
@Controller('discounts')
@ApiTags('Discount')
export class DiscountController {
  constructor(private readonly discountsService: DiscountService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get Public Discount',
  })
  async find(): Promise<object> {
    return this.discountsService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Discount',
  })
  @ApiOkResponse({
    type: GetDiscountResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.discountsService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public Discount',
  })
  @ApiOkResponse({
    type: CreateDiscountResponse,
  })
  async create(@Body() data: CreateDiscountDto, @Res() res: Response) {
    try {
      const {
        discount_name,
        description,
        discount_code,
        discount_percentage,
        price,
        start_date,
        end_date,
      } = data;

      console.log('data', data);

      const payload = {
        discount_name,
        description,
        discount_code,
        discount_percentage,
        price,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        status: 1,
        created_at: new Date(),
      };

      console.log('payload', payload);

      const result = await this.discountsService.store(payload);
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
    summary: 'Update Public Discount',
  })
  @ApiOkResponse({
    type: UpdateDiscountResponse,
  })
  async update(
    @Body() data: UpdateDiscountDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const {
        discount_name,
        status,
        description,
        discount_code,
        discount_percentage,
        price,
        start_date,
        end_date,
      } = data;

      const payload = {
        discount_name,
        description,
        discount_code,
        discount_percentage,
        price,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        status,
      };

      const validate = await this.discountsService.validateDiscount(id);

      // Check if discount already exists
      if (validate) {
        return sendResponse(
          res,
          HttpStatusCodes.CONFLICT,
          null,
          Errors.CATEGORY_NOT_FOUND.message,
        );
      }

      const result = await this.discountsService.update(id, payload);
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
      const users = await this.discountsService.find({
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

      const result = await this.discountsService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
