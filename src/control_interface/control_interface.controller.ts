import { Body, Controller, Delete, Get, Post, ParseIntPipe, Param, ParseBoolPipe, Put } from '@nestjs/common';
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { ControlResponse } from './control_interface.dto'
import * as assert from 'assert'

@Controller("control/")
export class ControlInterfaceController {
  constructor(private readonly controlInterfaceService: ControlInterfaceService) {}

  /**
   * @returns the control interface
   */
  @Get()
  getEvent() : string{
    return "This wil be the control interface"
  }

  /**
   * 
   * @param body a piece of an EventData object
   * @requires body must be a dictionary containing key<->value correspondance
   * matching the description of EventData
   * @returns Every event matching body
   */
  @Get("event/")
  async getEvents(@Body() body) : Promise<EventData[]> {
    // TODO : assert body
    return this.controlInterfaceService.getEvents(body);
  }

  /**
   * Assign a message to an event
   * 
   * @param event A piece of an event containing what must be changed
   * @param id event identifier concerned by change
   * @returns A ControlResponse
   */
  @Put("event/")
  async editEvent(@Body() event, @Body("id", ParseIntPipe) id : number) : Promise<ControlResponse>{
    return this.controlInterfaceService.editEvent(id, event);
  }

  /**
   * Delete events from the DB
   * 
   * @param event A dscription of the events that must be deleted
   * @returns ControlResponse
   */
  @Delete("event/")
  async deleteEvent(@Body() event) : Promise<ControlResponse>{
    return this.controlInterfaceService.deleteEvent(event);
  }

  /**
   * Add events to the DB
   * 
   * @param event A dscription of the events that must be added
   * @requires event.id doesn't match an already existing index in DB
   * @returns ControlResponse
   */
  @Post("event/")
  async addEvent(@Body() event) : Promise<ControlResponse>{
    return this.controlInterfaceService.addEvent(event);
  }

}
