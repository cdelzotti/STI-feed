import { Injectable, Post } from '@nestjs/common';
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
        });
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
    async editEvent(eventID: number, event) : Promise<ControlResponse>{
        await this.eventRepository.update({
            id : eventID
        },event).catch( (e) => {
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

    /**
     * Delete every events matching event
     * 
     * @param event The structure of events that must be deleted
     * @returns a ControlResponse
     */
    async deleteEvent(event) : Promise<ControlResponse>{
        await this.eventRepository.delete(event).catch( (e) => {
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

    /**
     * Add a event to the database manually
     * 
     * @param event The structure of the event that must be added. Must match
     * EventData description
     * @requires event.id doesn't match an index aready stored in DB
     * @returns a ControlResponse
     */
    async addEvent(event) : Promise<ControlResponse>{
        await this.eventRepository.insert(event).catch( (e) => {
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
