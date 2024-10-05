import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly internalRepository: Repository<CategoryEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(internalRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }

  async validateCategory(id) {
    const category = await this.internalRepository.find({
      where: {
        id,
      },
    });

    if (category.length > 0) {
      return false;
    }

    return true;
  }
}
