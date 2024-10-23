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
