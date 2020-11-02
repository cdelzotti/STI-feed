import { Module } from '@nestjs/common';
import { ControlInterfaceModule } from './control_interface/control_interface.module';
import { UserModule } from './users/user.module';
import { DataModule } from './data/data.module'
import { OutputModule } from './output/output.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { EventData } from './data/data.entity'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    UserModule, 
    ControlInterfaceModule, 
    DataModule,
    MulterModule.register({
      dest : './static/img'
    }),
    OutputModule, 
    TypeOrmModule.forRoot({
    type : "mongodb",
    host : "localhost",
    database : "stifeed",
    port : 27017,
    synchronize : true,
    username : "stiuser",
    password : "root",
    entities : [
      EventData
    ],
    useUnifiedTopology : true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection : Connection){}
}
