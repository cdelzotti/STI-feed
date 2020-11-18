import { Module } from '@nestjs/common';
import { OutputController } from './output.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventData } from '../data/data.entity'
import { EventLinks } from "../control_interface/control_interface.entity"
import { OutputService } from './output.service'

@Module({
  imports: [TypeOrmModule.forFeature([EventData, EventLinks])],
  controllers: [OutputController],
  providers: [OutputService],
})
export class OutputModule {}
