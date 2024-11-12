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
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
    FileInterceptor('image', {
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

  @Get('/product')
  @ApiOperation({
    summary: 'Get Public Product',
  })
  async find(): Promise<object> {
    return this.productsService.findAll();
  }

  @Get('/product/:id')
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

  @Post('/product')
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
        product_name,
        image,
      } = data;

      console.log('Data received:', data);

      const payload = {
        price,
        expired_date: new Date(expired_date),
        description,
        status: true,
        stock_quantity: stock_quantity || '0',  // Default to '0' if not provided
        user_id: 1128,
        product_name,
        image,
        created_at: new Date(),
      };

      console.log('Payload for storing:', payload);

      const result = await this.productsService.store(payload);
      return sendResponse(res, HttpStatusCodes.CREATED, result, null);
    } catch (err) {
      console.error('Error:', err);
      return sendResponse(
        res,
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        null,
        err.message,
      );
    }
  }

  @Put('/product/:id')
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
        product_name,
        image,
      } = data;

      const payload = {
        price,
        expired_date: new Date(expired_date),
        description,
        status,
        stock_quantity,
        user_id: 1128,
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

  @Delete('/product/:id')
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

  @Get('/expired')
  @ApiOperation({
    summary: 'Get Public Product',
  })
  async expired(): Promise<object> {
    return this.productsService.getExpiredItem();
  }
}
