import { Injectable } from '@nestjs/common';
import { User } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ObjectID } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}


    async createUser(user){
        await this.userRepository.insert(user);
        return user;
    }

    async getUser(){
        return this.userRepository.find();
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
}
