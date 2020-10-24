import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { APRetreiver } from './data.service';
import { DataResponse } from './data.dto'

@Controller("data/")
export class DataController {
  constructor(private readonly apRetreiver : APRetreiver) {}

  /**
   * Update database content
   * 
   * @param forceAwait Tells if the function must wait for every database changes to take effect
   * before returning a result
   * @returns a DataResponse
   */
  @Post("update-ap/")
  async getAP(@Body("await") forceAwait : boolean): Promise<DataResponse> {
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
