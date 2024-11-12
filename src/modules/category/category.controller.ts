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
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

import { CategoryService } from './category.service';
import {
  CreateCategoryResponse,
  GetCategoryResponse,
  UpdateCategoryResponse,
} from './response/category.response';
@Controller('categories')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get Public Category',
  })
  async find(): Promise<object> {
    return this.categoriesService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Category',
  })
  @ApiOkResponse({
    type: GetCategoryResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.categoriesService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public Category',
  })
  @ApiOkResponse({
    type: CreateCategoryResponse,
  })
  async create(@Body() data: CreateCategoryDto, @Res() res: Response) {
    try {
      const { category_name, description } = data;

      const payload = {
        category_name,
        description,
        created_at: new Date(),
      };

      const result = await this.categoriesService.store(payload);
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
    summary: 'Update Public Category',
  })
  @ApiOkResponse({
    type: UpdateCategoryResponse,
  })
  async update(
    @Body() data: UpdateCategoryDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { category_name, description } = data;

      const payload = {
        category_name,
        description,
      };

      console.log('payload', payload);

      const validate = await this.categoriesService.validateCategory(id);

      // Check if category already exists
      if (validate) {
        return sendResponse(
          res,
          HttpStatusCodes.CONFLICT,
          null,
          Errors.CATEGORY_NOT_FOUND.message,
        );
      }

      const result = await this.categoriesService.update(id, payload);
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
      const users = await this.categoriesService.find({
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

      const result = await this.categoriesService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
