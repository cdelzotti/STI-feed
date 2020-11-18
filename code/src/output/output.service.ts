import { Injectable, Post, BadRequestException } from '@nestjs/common';
import { Db, Repository, Equal, ObjectID } from 'typeorm';
import { EventData } from '../data/data.entity'
import { EventLinks } from "../control_interface/control_interface.entity"
import { InjectRepository } from '@nestjs/typeorm'
import { min } from 'class-validator';

@Injectable()
export class OutputService {
  
    constructor(
        // Create variable needed to access database
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>,
        @InjectRepository(EventLinks)
        private linksRepository : Repository<EventLinks>
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
     * Get every links related to a given event
     * 
     * @param eventID The ID of an event
     * @returns Every links related to `eventID`
     */
    async getLinks(eventID : ObjectID) : Promise<EventLinks[]> {
        // Checks if the requested event is marked as relevant
        let requestedEvent : EventData =  await this.eventRepository.findOne(eventID)
        if (requestedEvent == undefined) {
            throw new BadRequestException("That event doesn't exist")
        }
        if (requestedEvent.relevant) {
            return this.linksRepository.find({
                where : {
                    relatedEvent : eventID,
                },
                order : {
                    name : "ASC"
                }
            });
        } else {
            throw new BadRequestException("This ID isn't available")
        }
}

}
