import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { BannerEntity } from './entities/banner.entity';

@Injectable()
export class BannerService extends BaseService<BannerEntity> {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(bannerRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateBanner(id) {
    const banner = await this.bannerRepository.find({
      where: {
        id,
      },
    });

    if (banner.length > 0) {
      return false;
    }

    return true;
  }
}
