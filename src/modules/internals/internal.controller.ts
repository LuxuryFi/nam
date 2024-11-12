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
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { CreateUserDto, UpdateUserDto } from './dto/internal.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InternalService } from './internal.service';
import {
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
} from './response/internal.response';
@Controller('internals')
@ApiTags('Internal User')
export class InternalController {
  constructor(private readonly internalsService: InternalService) {}
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
    FileInterceptor('url', {
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
    summary: 'Get Public User',
  })
  async find(): Promise<object> {
    return this.internalsService.find();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get One Public User',
  })
  @ApiOkResponse({
    type: GetUserResponse,
  })
  async findOne(@Param('id') id: number): Promise<object> {
    return this.internalsService.findOne({
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
  async create(@Body() data: CreateUserDto, @Res() res: Response) {
    try {
      const { password, email, type, address, phone, name, url, gender, role } =
        data;
      console.log('data', data)
      const hashedPassword = bcrypt.hashSync(password, 10);
      const payload = {
        password: hashedPassword,
        email,
        type,
        address,
        phone,
        name,
        gender,
        url,
        role,
        status: 1,
      };

      const validate = await this.internalsService.validateUser(payload);

      // Check if user already exists
      if (!validate) {
        return sendResponse(
          res,
          HttpStatusCodes.CONFLICT,
          null,
          Errors.USER_EMAIL_EXISTED.message,
        );
      }

      const result = await this.internalsService.store(payload);
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
    summary: 'Update Public User',
  })
  @ApiOkResponse({
    type: UpdateUserResponse,
  })
  async update(
    @Body() data: UpdateUserDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { email, type, address, phone, name, url, status, gender } = data;
      console.log('payload', data);

      const payload = {
        email,
        type,
        address,
        phone,
        name,
        url,
        gender,
        status,
      };
      console.log('payload', payload);

      const result = await this.internalsService.update(id, payload);
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
      const users = await this.internalsService.find({
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

      const result = await this.internalsService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
