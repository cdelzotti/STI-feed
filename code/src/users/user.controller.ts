import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.dto'

@Controller("user/")
export class UserController {

  // constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "This shoud be the logging route";
  }

  @Post()
  postResponse(@Body() user  : User ): string{
    return `Hi ${user.id}, you're password is ${user.pwd}`;
  }
}
