import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { WatchEntity } from './entities/watch.entity';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

@Module({
  imports: [TypeOrmModule.forFeature([WatchEntity]), ConfigModule],
  controllers: [WatchController],
  providers: [WatchService],
  exports: [WatchService],
})
export class WatchModule {}
