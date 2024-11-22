import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService extends BaseService<FavoriteEntity> {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(favoriteRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getList(id) {
    const watches = await this.favoriteRepository.find({
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
      product_id: watch.product_id,
      created_at: watch.created_at,
    }));
  }

  async validateFavorite(id, userId) {
    console.log('favorite', id, userId);

    const favorite = await this.favoriteRepository.findOne({
      where: {
        product_id: id,
        user_id: userId,
      },
    });

    console.log('favorite', favorite);

    if (favorite) {
      return favorite;
    }
    return false;
  }
}
