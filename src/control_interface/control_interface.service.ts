import { Injectable } from '@nestjs/common';
import { Db, Repository, Equal } from 'typeorm';
import { EventData } from '../data/data.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ControlResponse } from './control_interface.dto'

@Injectable()
export class ControlInterfaceService {
  
    constructor(
        // Create variable needed to access database
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>
    ){}

    /**
     * @returns Every events matching body description
     */
    async getEvents(body) : Promise<EventData[]> {

        return this.eventRepository.find(body);
    }
    

    /**
     * Set the relevance of an given event to a given value
     * 
     * @param eventID : an event's identifier
     * @param relevance : a boolean that tells if the event is relevent or not
     * @requires eventID is int and != null
     * @requires eventID > 0
     * @requires eventID < max_event_index
     * @requires relevance != null
     * @returns request reponse
     */
    async setRelevance(eventID: number, relevance : boolean) : Promise<ControlResponse>{
        await this.eventRepository.update({
            id : eventID
        },{
            relevant : relevance
        }).catch( (e) => {
            return {
                status : `${e}`,
                error : true
            };
        })
        return {
            status : "",
            error : false
        };
    }

    /**
     * Assign a message to a event
     * 
     * @param eventID : an event's identifier
     * @param message : a message that must be assigned to an event
     * @requires eventID is int and != null
     * @requires eventID > 0
     * @requires eventID < max_event_index
     * @returns request reponse
     */
    async assignMessage(eventID: number, message : string) : Promise<ControlResponse>{
        await this.eventRepository.update({
            id : eventID
        },{
            message : message
        }).catch( (e) => {
            return {
                status : `${e}`,
                error : true
            };
        });
        return {
            status : "",
            error : false
        };
    }
}
