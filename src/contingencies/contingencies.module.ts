// contingency.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContingencyService } from './contingencies.service';
import { ContingencyController } from './contingencies.controller';
import { Contingency } from './contingency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contingency])],
  providers: [ContingencyService],
  controllers: [ContingencyController],
})
export class ContingenciesModule {}
