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

  async findAll(id) {
    const carts = await this.cartRepository.find({
      where: {
        user_id: id,
      },
      relations: ['product', 'product.discounts'],
    });

    const result = [];
    carts.forEach((cart) => {
      const payload = {
        id: cart.id,
        product_name: cart.product ? cart.product.product_name : '',
        price: cart.price,
        created_at: cart.created_at,
        user_id: cart.user_id,
        product_id: cart.product_id,
        image: cart.product.image || '',
        amount: cart.amount,
        discount:
          cart.product.discounts.length > 0
            ? cart.product.discounts[0].discount_percentage
            : 0,
      };
      result.push(payload);
    });
    return result;
  }

  async validateCart({ product_id, user_id }) {
    const cart = await this.cartRepository.findOne({
      where: {
        user_id,
        product_id,
      },
    });

    if (cart) {
      return {
        id: cart.id,
        amount: cart.amount,
      };
    }

    return {
      amount: 0,
    };
  }
}
