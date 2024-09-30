import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'config';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CONFIG } from '../config/config.provider';
import { InternalEntity } from './entities/internal.entity';

@Injectable()
export class InternalService extends BaseService<InternalEntity> {
  constructor(
    @InjectRepository(InternalEntity)
    private readonly internalRepository: Repository<InternalEntity>,
    @Inject(CONFIG) private readonly configService: IConfig,
  ) {
    super(internalRepository);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
