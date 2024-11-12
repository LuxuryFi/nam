import {
  Body,
  Controller,
  Delete,
  Get,
  Options,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @Options('/upload')
  handleOptions(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200); // Respond with 200 OK
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image_url', {
      // Configure Multer storage options
      storage: diskStorage({
        destination: './public/uploads', // Define the directory to store uploaded files
        filename: (req, file, cb) => {
          const filename = `${new Date().getTime()}-${file.originalname}`;
          cb(null, filename); // Set the file name
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file); // File metadata, including path, name, etc.
    return {
      message: 'File uploaded successfully!',
      file: {
        originalname: file.originalname,
        filename: file.filename, // This will include the timestamped filename
        path: file.path, // Path to the uploaded file on the server
      },
    };
  }

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
      const {
        title,
        description,
        display_order,
        area_id,
        image_url,
        start_date,
        end_date,
      } = data;
      const payload = {
        title,
        status: 1,
        description,
        display_order,
        area_id,
        link_url: image_url,
        image_url,
        start_date,
        end_date,
        created_at: new Date(),
      };

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
      const {
        title,
        status,
        description,
        display_order,
        area_id,
        start_date,
        end_date,
      } = data;
      const payload = {
        title,
        status,
        description,
        display_order,
        area_id,
        start_date,
        end_date,
        updated_at: new Date(),
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
