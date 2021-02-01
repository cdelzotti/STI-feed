import { Injectable, Post, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Db, Repository, Equal, ObjectID } from 'typeorm';
import { EventData } from '../data/data.entity'
import { Messages } from "../control_interface/control_interface.entity"
import { InjectRepository } from '@nestjs/typeorm'
import { min } from 'class-validator';

@Injectable()
export class OutputService {
  
    constructor(
        // Create variable needed to access database
        @InjectRepository(Messages)
        private messagesRepository : Repository<Messages>
    ){}

        /**
     * Get every up to date Messages 
     * 
     * @returns select pubished events
     */
    async getMessages(body) : Promise<Messages[]> {
        // TODO : Limiter la date
        // Returns only published event
        body.published = true;
         return this.messagesRepository.find({
            where : body,
            order : {
                dateDebut : "ASC"
            }
        });
}

}
