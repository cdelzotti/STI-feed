
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Define strategy for logging. It's different from the JWT strategy because 
 * the JWT strategy checks if a given token is valid. The logging strategy must
 * check if the given creditentials are valid and generate a JWT.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  /**
   * Checks if `user` and `password` are valid (i.e. they must match to something in DB)
   * @param user
   * @param password 
   */
  async validate(user : string, password : string): Promise<any> {
    const userDB = await this.usersService.validateUser(user, password);
    if (!userDB) {
      throw new UnauthorizedException();
    }
    return userDB;
  }
}
