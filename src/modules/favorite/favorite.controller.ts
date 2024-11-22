import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateFavoriteDto } from './dto/favorite.dto';

import { Auth } from 'src/decorators/auth.decorator';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteResponse } from './response/favorite.response';
@Controller('favorites')
@ApiTags('Favorite')
export class FavoriteController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get('')
  @Auth()
  @ApiOperation({
    summary: 'Get Public Favorite',
  })
  async find(@Req() req: any): Promise<object> {
    return this.favoritesService.getList(req.user.id);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create Public Favorite',
  })
  @ApiOkResponse({
    type: CreateFavoriteResponse,
  })
  async create(
    @Body() data: CreateFavoriteDto,
    @Res() res: Response,
    @Req() req: any,
  ) {
    try {
      const { product_id } = data;
      console.log('product', product_id);
      const userId = req.user['id'];

      console.log('userId', userId);
      console.log('product_id', product_id);
      const payload = {
        product_id: product_id,
        user_id: userId,
        created_at: new Date(),
      };

      const validation = await this.favoritesService.validateFavorite(
        product_id,
        userId,
      );

      console.log('validate', validation);
      if (validation) {
        const result = await this.favoritesService.delete(validation.id);
        return sendResponse(
          res,
          HttpStatusCodes.CREATED,
          {
            deleted_id: validation.id,
          },
          null,
        ); // Use 201 Created for successful user creation
      }

      const result = await this.favoritesService.store(payload);
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
      const users = await this.favoritesService.find({
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

      const result = await this.favoritesService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
