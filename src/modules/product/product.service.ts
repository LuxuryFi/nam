import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { FavoriteEntity } from '../favorite/entities/favorite.entity';
import { WatchEntity } from '../watch/entities/watch.entity';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(WatchEntity)
    private readonly watchRepository: Repository<WatchEntity>,

    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(productRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async findAll() {
    const products = await this.productRepository.find({
      where: {
        status: true,
      },
      relations: ['discounts', 'user', 'category'],
    });

    console.log('product', products);
    const result = products.map((product) => {
      return {
        product_name: product.product_name,
        description: product.description,
        image: product.image,
        stock_quantity: product.stock_quantity,
        id: product.id,
        price: product.price,
        discount_percentage:
          product.discounts.length > 0
            ? product.discounts[0].discount_percentage
            : 0,
        user_id: product.user ? product.user.id : '',
        author: product.user ? product.user.name : 0,
        category_name: product.category ? product.category.category_name : '',
      };
    });

    return result;
  }

  async getExpiredItem() {
    try {
      const products = await this.productRepository.find({
        where: {
          status: true,
        },
      });
      const currentDate = new Date();

      const expired = [];
      const timestamp = 86400000;
      products.forEach((product) => {
        const productDate = new Date(product.expired_date);
        const diff = productDate.getTime() - currentDate.getTime();
        const day = Math.round(diff / timestamp);

        if (day < 0) {
          this.productRepository.update(product.id, {
            status: false,
          });
        } else if (day < 5) {
          expired.push({ ...product, dayLeft: day });
        }
      });
      return expired;
    } catch (err) {
      console.log(err);
    }
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

  async findProductFavorite(user_id) {
    const favorites = await this.favoriteRepository.find({
      where: {
        user_id,
      },
    });
    console.log("🚀 ~ ProductService ~ findProductFavorite ~ favorites:", favorites)

    const watches = await this.watchRepository.find({
      where: {
        user_id,
      },
    });

    const favoriteIDS = favorites.map((favorite) => favorite.product_id);
    const watchIDS = watches.map((favorite) => favorite.product_id);

    return {
      watch: watchIDS,
      favorites: favoriteIDS,
    };
  }
}
