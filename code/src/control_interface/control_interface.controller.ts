import { Body, Controller, Delete, Get, Post, Res, Req, Put, UseInterceptors, UploadedFile, Param, ParseBoolPipe} from '@nestjs/common';
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { ControlResponse } from './control_interface.dto'
import * as assert from 'assert'
import { Response } from 'express'
import { EventWithCompDatePipe, EventWithIDPipe, EventWithoutIDPipe, NormalEventPipe, ObjectIDPipe} from "./control_interface.pipe"
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { handleFileName } from '../utils/upload-file.utils'
import { identity } from 'rxjs/internal/util/identity';
import { ObjectID } from 'mongodb';
import { get } from 'http';

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
  @Post("event/")
  async addEvent(@Body(new EventWithoutIDPipe()) event) : Promise<ControlResponse>{
    return this.controlInterfaceService.addEvent(event);
  }

  /**
   * Add and image
   */
  @Post("picture/:id")
  @UseInterceptors(FileInterceptor('file', {
    storage : diskStorage({
      destination : './static/img',
      filename : handleFileName
    })
  }))
  async uploadAttached(@Param(new ObjectIDPipe()) id : ObjectID, @UploadedFile() file) : Promise<ControlResponse> {
    return this.controlInterfaceService.registerAttached(id, file.filename)
  }
  
  @Delete("picture/:id")
  async removeAttached(@Param(new ObjectIDPipe()) id : ObjectID) : Promise<ControlResponse>{
    return this.controlInterfaceService.registerAttached(id, "")
  }

  @Post("link/:id")
  async addLink(@Param(new ObjectIDPipe()) eventID, @Body() links) : Promise<ControlResponse>{
    return this.controlInterfaceService.addLink(eventID, links);
  }

  @Get("link/:id")
  async getLinks(@Param(new ObjectIDPipe()) eventID){
    return this.controlInterfaceService.getLinks(eventID);
  }

  @Delete("link/:id")
  async deleteLink(@Param(new ObjectIDPipe()) id, @Body('eventID', new ParseBoolPipe()) isEventID){
    return this.controlInterfaceService.deleteLinks(id, isEventID)
  }
}
