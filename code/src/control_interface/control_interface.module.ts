import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ControlInterfaceController } from './control_interface.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventData } from '../data/data.entity';
import { Messages } from './control_interface.entity'
import { ControlInterfaceService } from './control_interface.service';
import { EventExtractorMiddleware } from './control_interface.middleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UserModule } from '../users/user.module';


// Module for the control component. Handles editing/getting data and the control website
@Module({
  imports: [TypeOrmModule.forFeature([EventData, Messages]), UserModule],
  controllers: [ControlInterfaceController],
  providers: [ControlInterfaceService],
})
export class ControlInterfaceModule {
}
