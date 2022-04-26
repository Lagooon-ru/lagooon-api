import { Module } from '@nestjs/common';
import { TildaResolver } from './tilda.resolver';
import { TildaService } from './tilda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TildaEntity } from './tilda.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([TildaEntity]), HttpModule],
  providers: [TildaResolver, TildaService],
})
export class TildaModule {}
