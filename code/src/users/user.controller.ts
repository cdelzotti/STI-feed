import { Body, Controller, Get, Post, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller("user/")
export class UserController {

  constructor(
    private userService: UsersService) {}

  @Get()
  async getUsers(@Body() user) {
    return this.userService.getUser(user);
  }

  @Post()
  async addUser(@Body() user) {
    return this.userService.createUser(user);
  }

  @Put()
  async editUser(@Body() user){
    return this.userService.editUser(user);
  }

  @Delete()
  async deleteUser(@Body() user){
    return this.userService.deleteUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/")
  async test(@Request() req){
    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("checkauth/")
  testJWT(@Body() user){
    return {
      connected : true
    };
  }
}
