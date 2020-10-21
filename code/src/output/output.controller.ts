import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { EventData } from '../data/data.entity'
import { OutputService } from './output.service'
import { Response } from 'express'

@Controller("output/")
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  /**
   * @returns the public website
   */
  @Get()
  getSite(@Res() response : Response){
    response.redirect("/public-site/index.html");
  }

  @Get("event/")
  /**
   * @returns the events that are marked as relevant
   */
  async getPublicEvents(): Promise<EventData[]>{
    return this.outputService.getPublicEvents();
  }

}
