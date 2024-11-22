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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { HttpStatusCodes } from 'src/constants/common';
import { Errors } from 'src/constants/errors';
import { sendResponse } from 'src/utils/response.util';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  CreateUserResponse,
  GetUserResponse,
  UpdateUserResponse,
} from './response/user.response';
import { UsersService } from './users.service';
@Controller('users')
@ApiTags('Public User')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
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

  @Post('user/upload')
  @UseInterceptors(
    FileInterceptor('url', {
      // Configure Multer storage options
      storage: diskStorage({
        destination: './public/uploads', // Define the directory to store uploaded files
        filename: (req, file, cb) => {
          console.log('file', file);
          console.log('req', req);
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

  @Get('user')
  @ApiOperation({
    summary: 'Get Public User',
  })
  async find(@Res() res: Response): Promise<object> {
    const result = await this.usersService.find();
    return sendResponse(res, HttpStatusCodes.CREATED, result, null); // Use 201 Created for successful user creation
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Get One Public User',
  })
  @ApiOkResponse({
    type: GetUserResponse,
  })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<object> {
    const result = await this.usersService.findOne({
      where: {
        id: id,
      },
    });

    return sendResponse(res, HttpStatusCodes.CREATED, result, null); // Use 201 Created for successful user creation
  }

  @Post()
  @ApiOperation({
    summary: 'Create Public User',
  })
  @ApiOkResponse({
    type: CreateUserResponse,
  })
  @Post()
  async create(@Body() data: CreateUserDto, @Res() res: Response) {
    try {
      const { password, email, type, address, phone, name, url, gender } = data;

      const hashedPassword = bcrypt.hashSync(password, 10);
      const payload = {
        password: hashedPassword,
        email,
        type,
        address,
        phone,
        gender,
        name,
        url,
        status: 1,
        created_at: new Date(),
      };

      const validate = await this.usersService.validateUser(payload);

      // Check if user already exists
      if (!validate) {
        return sendResponse(
          res,
          HttpStatusCodes.CONFLICT,
          null,
          Errors.USER_EMAIL_EXISTED.message,
        );
      }

      const result = await this.usersService.store(payload);
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

  @Put('user/:id')
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
      const { type, address, phone, name, url, status, gender } = data;
      console.log('payload', data);

      const payload = {
        type,
        address,
        phone,
        name,
        url,
        gender,
        status,
        created_at: new Date(),
      };

      console.log('payload', payload);
      const result = await this.usersService.update(id, payload);
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

  @Put('password/:id')
  @ApiOperation({
    summary: 'Update Public User Password',
  })
  @ApiOkResponse({
    type: UpdateUserResponse,
  })
  async changePassword(
    @Body() data: ChangePasswordDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const { password } = data;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const payload = {
        password: hashedPassword,
      };

      const result = await this.usersService.update(id, payload);
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

  @Delete('user/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const users = await this.usersService.find({
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

      const result = await this.usersService.delete(id);
      return sendResponse(res, HttpStatusCodes.OK, result, null);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
