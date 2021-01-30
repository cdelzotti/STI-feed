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
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>,
        @InjectRepository(Messages)
        private messagesRepository : Repository<Messages>
    ){}

    /**
     * @returns Every events marked as relevant
     */
    async getPublicEvents() : Promise<EventData[]> {
        // Get curent date
        let hourLessDay : Date = new Date();
        // remove minutes
        hourLessDay.setHours(0, 0, 0, 0)
        return this.eventRepository.find({
            where : {
                relevant : true,
                dateFin : {$gte: hourLessDay}
            },
            order : {
                dateDebut : "ASC"
            }
        });
    }

        /**
     * Get every up to date Messages 
     * 
     * @returns Every Messages related to `eventID`
     */
    async getMessages() : Promise<Messages[]> {
        // TODO : Limiter la date
         return this.messagesRepository.find({
            where : {

            },
            order : {
                dateDebut : "ASC"
            }
        });
}

}
