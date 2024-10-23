import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { DetailEntity } from './entities/detail.entity';

@Injectable()
export class DetailService extends BaseService<DetailEntity> {
  constructor(
    @InjectRepository(DetailEntity)
    private readonly detailRepository: Repository<DetailEntity>,

    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(detailRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async listAll(id) {
    const result = await this.detailRepository.find({
      where: {
        order_id: id,
      },
      relations: ['product'],
    });

    return result.map((detail) => ({
      id: detail.id,
      amount: detail.amount,
      price: detail.price,
      product_name: detail.product.product_name,
      product_image: detail.product.image,
    }));
  }
}
