import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { DiscountEntity } from './entities/discount.entity';

@Injectable()
export class DiscountService extends BaseService<DiscountEntity> {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(discountRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateDiscount(id) {
    const discount = await this.discountRepository.find({
      where: {
        id,
      },
    });

    if (discount.length > 0) {
      return false;
    }

    return true;
  }
}
