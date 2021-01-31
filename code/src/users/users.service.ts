import { Injectable } from '@nestjs/common';
import { User } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ObjectID } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtService : JwtService
    ){}


    async createUser(user){
        await this.userRepository.insert(user);
        return user;
    }

    async getUser(user){
        return this.userRepository.findOne(user);
    }

    async editUser(user){
        user._id = new ObjectID(user._id);
        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(user){
        user._id = new ObjectID(user._id);
        await this.userRepository.delete(user);
        return {
            status : "deleted"
        }
    }

    // AUTH

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.getUser({
            username : username,
            password : pass
        });
        if (user) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        //    access_token: "this.jwtService.sign(payload)",
        };
      }
}
