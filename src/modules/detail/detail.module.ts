import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';
import { DetailEntity } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailEntity]), ConfigModule],
  controllers: [DetailController],
  providers: [DetailService],
  exports: [DetailService],
})
export class DetailModule {}
