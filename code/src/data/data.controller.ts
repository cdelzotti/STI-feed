import { Body, Controller, Delete, Get, Post, ParseBoolPipe } from '@nestjs/common';
import { DataService } from './data.service';
import { DataResponse } from './data.dto'

@Controller("data/")
export class DataController {
  constructor(private readonly apRetreiver : DataService) {}

  /**
   * Update database content
   * 
   * @param forceAwait Tells if the function must wait for every database changes to take effect
   * before returning a result
   * @returns a DataResponse
   */
  @Post("update-ap/")
  async getAP(@Body("await", new ParseBoolPipe()) forceAwait : boolean): Promise<DataResponse> {
    let path : string = "static/AP.xlsx";
    if (forceAwait) {
      return this.apRetreiver.APextract(path); 
    } else {
      this.apRetreiver.APextract(path);
      return {
        update : "AP",
        status : "",
        error : false
      } 
    }
  }
}
