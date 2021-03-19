import { Module } from '@nestjs/common';
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';
import { UserModule } from '../users/user.module';

@Module({
  providers: [CloudService],
  controllers: [CloudController],
  imports : [UserModule]
})
export class CloudModule {}
