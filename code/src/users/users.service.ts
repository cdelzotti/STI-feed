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
     *    username : "admin",
     *   password : "sti-feed"
     * }
     * ```
     */
    async deleteUser(user){
        user._id = new ObjectID(user._id);
        await this.userRepository.delete(user);
        return {
            status : "deleted"
        }
    }

    // AUTH : based on tutorials and documentation provided by NestJS : https://docs.nestjs.com/security/authentication


    /**
     * Handle user validation
     * 
     * @param username 
     * @param pass 
     */
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
        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
