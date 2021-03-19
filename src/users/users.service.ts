import { Injectable } from '@nestjs/common';
import { User } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ObjectID } from 'mongodb';
import * as assert from 'assert';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtService : JwtService
    ){}

    /**
     * Create a user in DB
     * 
     * @param user is a datastructure as follow : 
     *```
     *{
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
     */
    async createUser(user){
        assert(user != undefined && user != {}, "uer must me specified")

        await this.userRepository.insert(user);
        return user;
    }

    /**
     * Returns the match between the database and `user`
     * 
     * @param user a datastructure as follow :  
     * ```
     *{
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
     */
    async getUser(user){
        // No assert possible on body as it defines constraints for the
        // current query, so an empty body just means no constraints and
        // an invalid body will just return an empty query. Nothing but determined
        // behavior.

        if (user != undefined && user != {}) {    
            return this.userRepository.findOne(user);
        }
        return {};
    }

    /**
     * Edit the user corresponding to `user`
     * 
     * 
     * @param user a datastructure as follow :  
     * ```
     *{
     *    _id : "myMongoID"    
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
     */
    async editUser(user){
        assert(user._id != undefined, "Must provide an id for event edition");

        user._id = new ObjectID(user._id);
        await this.userRepository.save(user);
        return user;
    }

    /**
     * Delete user corresponding to `user`
     * 
     * 
     * @param user a datastructure as follow :  
     * ```
     *{
     *    _id : "myMongoID"    
     *    username : "admin", (optional)
     *   password : "sti-feed" (optional)
     * }
     * ```
     */
    async deleteUser(user){
        assert(user._id != undefined, "Must provide an id for event deletion");

        user._id = new ObjectID(user._id);
        await this.userRepository.delete(user);
        return {
            status : "deleted"
        }
    }

    // AUTH : based on documentation provided by NestJS : https://docs.nestjs.com/security/authentication


    /**
     * Handle user validation
     * 
     * @param username 
     * @param pass 
     */
    async validateUser(username: string, pass: string): Promise<any> {
        assert(username != "" && pass != "", "username and pass must be specified")

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
    
      /**
       * Generates a JWT for a given user
       * 
       * @param user must respect the following structure :
       * ```
       *{
       *    username : "admin",
       *   password : "sti-feed"
       * }
       * ```
       */
      async login(user: any) {
        assert(user != undefined, "user must be specified !")

        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
