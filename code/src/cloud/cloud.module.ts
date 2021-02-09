import { Module } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './cloud.entity';

@Module({
  providers: [CloudService],
  controllers: [CloudController],
  imports : [TypeOrmModule.forFeature([Upload])]
})
export class CloudModule {}
