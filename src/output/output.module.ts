import { Module } from '@nestjs/common';
import { OutputController } from './output.controller';

@Module({
  imports: [],
  controllers: [OutputController],
  providers: [],
})
export class OutputModule {}
