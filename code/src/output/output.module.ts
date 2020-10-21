import { Module } from '@nestjs/common';
import { OutputController } from './output.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventData } from '../data/data.entity'
import { OutputService } from './output.service'

@Module({
  imports: [TypeOrmModule.forFeature([EventData])],
  controllers: [OutputController],
  providers: [OutputService],
})
export class OutputModule {}
