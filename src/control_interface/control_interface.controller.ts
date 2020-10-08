import { Body, Controller, Delete, Get, Post, ParseIntPipe, Param, ParseBoolPipe } from '@nestjs/common';
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { ControlResponse } from './control_interface.dto'

@Controller("control/")
export class ControlInterfaceController {
  constructor(private readonly controlInterfaceService: ControlInterfaceService) {}

  @Get("event/")
  async getEvents(@Body() body) : Promise<EventData[]> {
    // TODO : assert body
    return this.controlInterfaceService.getEvents(body);
  }

  @Post("event/relevance/")
  async setRelevence(@Body("id", ParseIntPipe) eventID : number, @Body("relevance", ParseBoolPipe) relevance : boolean ) : Promise<ControlResponse> {
      return this.controlInterfaceService.setRelevance(eventID, relevance);
  }

  @Post("event/message/")
  async assignMessage(@Body("message") message : string, @Body("id", ParseIntPipe) id : number) : Promise<ControlResponse>{
    // TODO : assert message
    return this.controlInterfaceService.assignMessage(id, message);
  }

}
