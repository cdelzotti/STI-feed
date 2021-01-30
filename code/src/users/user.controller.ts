import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service'


@Controller("user/")
export class UserController {

  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.getUser() 
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
}
