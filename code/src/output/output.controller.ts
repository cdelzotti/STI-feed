import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { EventData } from '../data/data.entity'
import { Messages } from '../control_interface/control_interface.entity'
import { MessageRequest } from './output.pipe'
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


  @Post("msg/")
  async getMsg(@Body(new MessageRequest()) body): Promise<Messages[]>{
    return this.outputService.getMessages(body);
  }

}
