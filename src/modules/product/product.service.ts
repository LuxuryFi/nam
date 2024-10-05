import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(productRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateProduct(id) {
    const product = await this.productRepository.find({
      where: {
        id,
      },
    });

    if (product.length > 0) {
      return false;
    }

    return true;
  }
}
