import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { EventData } from '../data/data.entity'
import { Messages } from '../control_interface/control_interface.entity'
import { ObjectIDPipe } from '../control_interface/control_interface.pipe'
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

  @Get("link/:id")
  async getLinks(@Param(new ObjectIDPipe()) eventID): Promise<Messages[]>{
    return this.outputService.getMessages(eventID);
  }

}
