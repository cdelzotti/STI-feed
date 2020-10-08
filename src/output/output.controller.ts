import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { CheckItem } from './output.dto'

@Controller("output/")
export class OutputController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "This module will handle output";
  }
}
