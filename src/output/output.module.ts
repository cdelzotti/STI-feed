import { Module } from '@nestjs/common';
import { OutputController } from './output.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventData } from '../data/data.entity'
import { Messages } from "../control_interface/control_interface.entity"
import { OutputService } from './output.service'
import { ControlInterfaceModule } from '../control_interface/control_interface.module'

@Module({
  imports: [TypeOrmModule.forFeature([EventData, Messages]), ControlInterfaceModule],
  controllers: [OutputController],
  providers: [OutputService],
})
export class OutputModule {}
