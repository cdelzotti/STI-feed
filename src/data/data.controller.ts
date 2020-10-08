import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { APRetreiver } from './data.service';
import { DataResponse } from './data.dto'

@Controller("data/")
export class DataController {
  constructor(private readonly apRetreiver : APRetreiver) {}

  @Post("update-ap/")
  async getAP(): Promise<DataResponse> {
    return this.apRetreiver.APextract("static/AP.xlsx");
  }
}
