import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { WatchEntity } from './entities/watch.entity';

@Injectable()
export class WatchService extends BaseService<WatchEntity> {
  constructor(
    @InjectRepository(WatchEntity)
    private readonly watchRepository: Repository<WatchEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(watchRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getList(id) {
    const watches = await this.watchRepository.find({
      where: {
        user_id: id,
      },
      relations: ['product'], // Should be recognized correctly now
    });

    return watches.map((watch) => ({
      id: watch.id,
      product_name: watch.product.product_name,
      product_image: watch.product.image,
      product_status: watch.product.status,
      created_at: watch.created_at,
    }));
  }

  async validateWatch(id, userId) {
    console.log('watch', id, userId);

    const watch = await this.watchRepository.findOne({
      where: {
        product_id: id,
        user_id: userId,
      },
    });

    console.log('watch', watch);

    if (watch) {
      return watch;
    }
    return false;
  }
}
