import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { CONFIG } from '../config/config.provider';
import { DetailEntity } from './entities/detail.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(DetailEntity)
    private readonly detailRepository: Repository<DetailEntity>,

    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(orderRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateOrder(id) {
    const order = await this.orderRepository.find({
      where: {
        id,
      },
    });

    if (order.length > 0) {
      return false;
    }

    return true;
  }

  async getCartDetail(user_id) {
    const result = await this.cartRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }

  async bulkInsert(id, payload) {
    try {
      payload.forEach((item) => {
        this.detailRepository.insert(item);
      });

      await this.cartRepository.delete({
        user_id: id,
      });
      return true;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  }
}
