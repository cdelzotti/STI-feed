
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(user : string, password : string): Promise<any> {
    const userDB = await this.usersService.validateUser(user, password);
    if (!userDB) {
      throw new UnauthorizedException();
    }
    return userDB;
  }
}
