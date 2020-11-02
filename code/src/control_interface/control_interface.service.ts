import { BadRequestException, Injectable, Post} from '@nestjs/common';
import { Db, Repository, Equal, MoreThan} from 'typeorm';
import { EventData } from '../data/data.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ControlResponse } from './control_interface.dto'
import { ObjectID } from 'mongodb'


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
        return this.eventRepository.find({
                where : body,
                order : {
                    dateDebut : "ASC"
                }
            });
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
    async editEvent(eventID: ObjectID, event) : Promise<ControlResponse>{
        let eventFromDB : EventData = await this.eventRepository.findOne(eventID);
        if (eventFromDB == undefined) {
            throw new BadRequestException("Couldn't find an event with that ID")
        }
        await this.eventRepository.save(event).catch( (e) => {
            return {
                status : `${e}`,
                error : true
            };
        });
        return {
            status : "",
            error : false
        };
        // await this.eventRepository.update(eventID,eventFromDB)
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
        // Parse dates

        event["attachedFile"] = ""
        await this.eventRepository.insert(event).catch( (e) => {
            return {
                status : `${e}`,
                error : true
            };
        });
        return {
            _id : event._id,
            status : "",
            error : false
        };
    }

    /**
     * Edits the database to set the attached file field to `filename`
     * 
     * @param id An object identifier
     * @param filename Name of the attached file
     */
    async registerAttached(id : ObjectID, filename){
        await this.eventRepository.update({
            _id : id
        }, {
            attachedFile : filename
        }).catch((e) => {
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
