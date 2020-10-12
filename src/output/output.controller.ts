import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { EventData } from '../data/data.entity'
import { OutputService } from './output.service'


@Controller("output/")
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  @Get()
  getSite(): string {
    return "This will be the public interface showing output";
  }

  @Get("event/")
  async getPublicEvents(): Promise<EventData[]>{
    return this.outputService.getPublicEvents();
  }

}
