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
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

import { ProductService } from './product.service';
import {
  CreateProductResponse,
  GetProductResponse,
  UpdateProductResponse,
} from './response/product.response';
@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get Public Product',
  })
  async find(): Promise<object> {
    return this.productsService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Product',
  })
  @ApiOkResponse({
    type: GetProductResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.productsService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public Product',
  })
  @ApiOkResponse({
    type: CreateProductResponse,
  })
  async create(@Body() data: CreateProductDto, @Res() res: Response) {
    try {
      const {
        price,
        stock_quantity,
        expired_date,
        description,
        status,
        user_id,
        product_name,
        image,
      } = data;

      const payload = {
        price,
        expired_date,
        description,
        status,
        stock_quantity,
        user_id,
        product_name,
        image,
        created_at: new Date(),
      };

      console.log(payload);

      const result = await this.productsService.store(payload);
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
    summary: 'Update Public Product',
  })
  @ApiOkResponse({
    type: UpdateProductResponse,
  })
  async update(
    @Body() data: UpdateProductDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const {
        price,
        stock_quantity,
        expired_date,
        description,
        status,
        user_id,
        product_name,
        image,
      } = data;

      const payload = {
        price,
        expired_date,
        description,
        status,
        stock_quantity,
        user_id,
        product_name,
        image,
        updated_at: new Date(),
      };

      const result = await this.productsService.update(id, payload);
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
      const users = await this.productsService.find({
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

      const result = await this.productsService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
