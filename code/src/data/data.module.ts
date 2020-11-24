import { Module, MiddlewareConsumer } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service'
import { EventData } from './data.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataUpdateAwaitCheck } from './data.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([EventData])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(DataUpdateAwaitCheck).forRoutes('/data/update-ap/');
  }
}
