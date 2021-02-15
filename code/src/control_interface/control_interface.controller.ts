import { Body, Controller, Delete, Get, Post, Res, Put, Param, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from "../users/jwt-auth.guard"
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { ControlResponse } from './control_interface.dto'
import { Response } from 'express'
import { EventWithCompDatePipe, EventWithIDPipe, EventWithoutIDPipe, NormalEventPipe, ObjectIDPipe, MessagePipe} from "./control_interface.pipe"
import { ObjectID } from 'mongodb';


@Controller("control/")
export class ControlInterfaceController {
  constructor(private readonly controlInterfaceService: ControlInterfaceService) {}

  /**
   * @returns the control interface
   */
  @Get()
  getControlPage(@Res() response : Response) {
    response.redirect("/control-site/index.html");
  }

  /**
   * 
   * @param body a piece of an EventData object
   * @requires body must be a dictionary containing key<->value correspondance
   * matching the description of EventData
   * @returns Every event matching body
   */
  @UseGuards(JwtAuthGuard)
  @Post("select-event/")
  async getEvents(@Body(new EventWithCompDatePipe()) body) : Promise<EventData[]> {
    // TODO : assert body
    return this.controlInterfaceService.getEvents(body);

  }

  /**
   * Update an event
   * 
   * @param event A piece of an event containing what must be changed
   * @param id event identifier concerned by change
   * @returns A ControlResponse
   */
  @UseGuards(JwtAuthGuard)
  @Put("event/")
  async editEvent(@Body(new EventWithIDPipe()) event) : Promise<ControlResponse>{
    return this.controlInterfaceService.editEvent(event["_id"], event);
  }

  /**
   * Delete events from the DB
   * 
   * @param event A dscription of the events that must be deleted
   * @returns ControlResponse
   */
  @UseGuards(JwtAuthGuard)
  @Delete("event/")
  async deleteEvent(@Body(new NormalEventPipe()) event) : Promise<ControlResponse>{
    return this.controlInterfaceService.deleteEvent(event);
  }

  /**
   * Add events to the DB
   * 
   * @param event A dscription of the events that must be added
   * @requires event.id doesn't match an already existing index in DB
   * @returns ControlResponse
   */
  @UseGuards(JwtAuthGuard)
  @Post("event/")
  async addEvent(@Body(new EventWithoutIDPipe()) event) : Promise<ControlResponse>{
    return this.controlInterfaceService.addEvent(event);
  }
  
  /**
   * Get messages matching `msg`
   * 
   * @param msg 
   */
  @UseGuards(JwtAuthGuard)
  @Post("getMsg/")
  async getMsg(@Body(new MessagePipe(1, true)) msg){
    return this.controlInterfaceService.getMessages(msg);
  }

  /**
   * Add a message
   * 
   * @param msg 
   */
  @UseGuards(JwtAuthGuard)
  @Post("msg/")
  async addMsg(@Body(new MessagePipe(0, false)) msg) : Promise<ControlResponse>{
    return this.controlInterfaceService.addMessage(msg);
  }

  /**
   * Delete a message
   * 
   * @param id a mongoDB id
   */
  @UseGuards(JwtAuthGuard)
  @Delete("msg/:id")
  async deleteMessage(@Param(new ObjectIDPipe()) id : ObjectID){
    return this.controlInterfaceService.deleteMessage(id)
  }

  /**
   * Edit a given message
   * 
   * @param msg Message to edit (id must be provided)
   */
  @UseGuards(JwtAuthGuard)
  @Put("msg/")
  async editMessage(@Body(new MessagePipe(2, false)) msg) : Promise<ControlResponse>{
    return this.controlInterfaceService.editMessage(msg);
  }


  /**
   * Get every messages related to an event
   * 
   * @param eventID : A mongo DB id
   */
  @UseGuards(JwtAuthGuard)
  @Get("eventmsg/:id")
  async getEventMessages(@Param(new ObjectIDPipe()) eventID){
    return this.controlInterfaceService.getEventMessage(eventID);
  }
}
