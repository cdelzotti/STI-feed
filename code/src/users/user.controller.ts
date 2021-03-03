import { Body, Controller, Get, Post, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller("user/")
export class UserController {

  constructor(
    private userService: UsersService) {}

  /**
   * Handle the user creation
   * @param user must follow the following structure :
    * ```
     *{
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addUser(@Body() user) {
    return this.userService.createUser(user);
  }

  /**
   * Handle the user edition
   * @param user must follow the following structure :
    * ```
     *{
     *    _id : "myMongoID",
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
   */
  @UseGuards(JwtAuthGuard)
  @Put()
  async editUser(@Body() user){
    return this.userService.editUser(user);
  }

  /**
   * Handle the user deletion
   * @param user must follow the following structure :
    * ```
     *{
     *    _id : "myMongoID",
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Body() user){
    return this.userService.deleteUser(user);
  }

  /**
   * Handle user authentification
   * @param req contains a JSON-formatted stucture as follow :
    * ```
     *{
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
   */
  @UseGuards(LocalAuthGuard)
  @Post("auth/")
  async test(@Request() req){
    return this.userService.login(req.user);
  }

  /**
   * Allows anyone to check if a JWT is valid
   * 
   * @returns `{connected : true}` if the Bearer token is valid, fails otherwise.
   */
  @UseGuards(JwtAuthGuard)
  @Get("checkauth/")
  testJWT(){
    return {
      connected : true
    };
  }
}
