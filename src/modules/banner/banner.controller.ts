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
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

import { BannerService } from './banner.service';
import {
  CreateBannerResponse,
  GetBannerResponse,
  UpdateBannerResponse,
} from './response/banner.response';
@Controller('banners')
@ApiTags('Banner')
export class BannerController {
  constructor(private readonly bannersService: BannerService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get Public Banner',
  })
  async find(): Promise<object> {
    return this.bannersService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public Banner',
  })
  @ApiOkResponse({
    type: GetBannerResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.bannersService.findOne({
      where: {
        id: id,
      },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public Banner',
  })
  @ApiOkResponse({
    type: CreateBannerResponse,
  })
  async create(@Body() data: CreateBannerDto, @Res() res: Response) {
    try {
      const { title, status, description, display_order, area_id, link_url, image_url, start_date, end_date } = data;
      const payload = {
        title, 
        status, 
        description, 
        display_order, 
        area_id, 
        link_url, 
        image_url, 
        start_date, 
        end_date,
        created_at: new Date()
      };

      console.log(payload)

      const result = await this.bannersService.store(payload);
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
    summary: 'Update Public Banner',
  })
  @ApiOkResponse({
    type: UpdateBannerResponse,
  })
  async update(
    @Body() data: UpdateBannerDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { title, status, description, display_order, area_id, link_url, image_url, start_date, end_date } = data;
      const payload = {
        title, 
        status, 
        description, 
        display_order, 
        area_id, 
        link_url, 
        image_url, 
        start_date, 
        end_date,
        updated_at: new Date()
      };

      const result = await this.bannersService.update(id, payload);
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
      const users = await this.bannersService.find({
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

      const result = await this.bannersService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
