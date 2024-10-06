import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService extends BaseService<CartEntity> {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(cartRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateCart({ product_id, amount, user_id }) {
    const cart = await this.cartRepository.findOne({
      where: {
        user_id,
        product_id
      },
    });

    if (cart) {
      return {
        id: cart.id,
        amount: cart.amount,
      };
    }

    return {
      amount: 0
    };
  }
}
