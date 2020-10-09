import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CheckItem } from './output.dto'

@Controller("output/")
export class OutputController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "This will be the public interface showing output";
  }
}
