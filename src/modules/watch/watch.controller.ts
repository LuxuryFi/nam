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
import { CreateWatchDto } from './dto/watch.dto';

import { Auth } from 'src/decorators/auth.decorator';
import { CreateWatchResponse } from './response/watch.response';
import { WatchService } from './watch.service';
@Controller('watchs')
@ApiTags('Watch')
export class WatchController {
  constructor(private readonly watchsService: WatchService) {}

  @Get('')
  @Auth()
  @ApiOperation({
    summary: 'Get Public Watch',
  })
  async find(@Req() req: any): Promise<object> {
    return this.watchsService.getList(req.user.id);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Create Public Watch',
  })
  @ApiOkResponse({
    type: CreateWatchResponse,
  })
  async create(
    @Body() data: CreateWatchDto,
    @Res() res: Response,
    @Req() req: any,
  ) {
    try {
      console.log('data', data);

      const { product_id } = data;
      const userId = req.user['id'];
      const payload = {
        product_id,
        user_id: userId,
        created_at: new Date(),
      };

      const validation = await this.watchsService.validateWatch(
        product_id,
        userId,
      );

      console.log('validate', validation);
      if (validation) {
        const result = await this.watchsService.delete(validation.id);
        console.log('result 2', result)

        return sendResponse(res, HttpStatusCodes.CREATED, result, null); // Use 201 Created for successful user creation
      }

      const result = await this.watchsService.store(payload);
      console.log('result', result)
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
      const users = await this.watchsService.find({
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

      const result = await this.watchsService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
