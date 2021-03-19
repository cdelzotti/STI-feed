import { BadRequestException, InternalServerErrorException, NotFoundException ,Injectable, Post} from '@nestjs/common';
import { Repository} from 'typeorm';
import { EventData } from '../data/data.entity'
import { Messages } from './control_interface.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ControlResponse } from './control_interface.dto'
import { ObjectID } from 'mongodb';
import * as assert from 'assert';

@Injectable()
export class ControlInterfaceService {
  
    constructor(
        // Create variable needed to access database
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>,
        @InjectRepository(Messages)
        private messagesRepository : Repository<Messages>
    ){}

    /**
     * @returns Every events matching body description
     */
    async getEvents(body) : Promise<EventData[]> {
        // No assert possible on body as it defines constraints for the
        // current query, so an empty body just means no constraints and
        // an invalid body will just return an empty query. Nothing but determined
        // behavior.
        return this.eventRepository.find({
                where : body,
                order : {
                    dateDebut : "ASC"
                }
            });
    }

    /**
     * Edit an event
     * 
     * @param eventID : an event's identifier
     * @param event : The new structure of event you want
     * @requires eventID must match in DB
     * @returns ControlResponse
     */
    async editEvent(eventID: ObjectID, event) : Promise<ControlResponse>{
        assert(eventID != undefined, "Cannnot edit event without ID!");
        assert(event != undefined && event != {} , "Cannnot edit event without an event body !");
        let eventFromDB : EventData = await this.eventRepository.findOne(eventID);
        if (eventFromDB == undefined) {
            throw new NotFoundException("Couldn't find an event with that ID")
        }
        await this.eventRepository.save(event).catch( (e) => {
            throw new BadRequestException({
                status : `${e}`,
                error : true
            });
        });
        return {
            _id : event._id,
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
        // Once again, no assert possible on body as it defines constraints for the
        // current query, so an empty body just means no constraints and
        // an invalid body will just return an empty query. Nothing but determined
        // behavior.
        await this.eventRepository.delete(event).catch( (e) => {
            throw new BadRequestException({
                status : `${e}`,
                error : true
            });
        });
        return {
            _id : event._id,
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
        // set default value
        assert(event != undefined && event != {} , "Cannnot create event without an event body !");
        await this.eventRepository.insert(event).catch( (e) => {
            throw new BadRequestException({
                status : `${e}`,
                error : true
            });
        });
        return {
            _id : event._id,
            status : "",
            error : false
        }
    }

    /**
     * Add a message into the db
     * 
     * @param eventID Event identifier
     * @param message Message that should be added to the DB
     */
    async addMessage(message : Messages) : Promise<ControlResponse> {
        assert(message != undefined, "Cannnot create event message without a message body !");
        // If an event is specified, it must exist
        if (message.relatedEvent != undefined) {
            if ( !await this.eventExist(new ObjectID(message.relatedEvent))) {
                throw new BadRequestException(`${message.relatedEvent} n'est associé à aucun évènement`)
            }
        }
        // Default value for `published` is false
        if (message.published == undefined) {
            message.published = false;
        }
        await this.messagesRepository.insert(message).catch((e => {
            // Case in wich the adding failed
            // Probably a connection problem with the DB
            throw new InternalServerErrorException(
            {
                status : `${e}`,
                error : true
            });
        }));
        return {
            _id : message._id.toString(),
            status : "",
            error : false
        };
    }

    /**
     * Get every messages related to a given event
     * 
     * @param eventID The ID of an event
     * @returns Every links related to `eventID`
     */
    async getEventMessage(eventID : ObjectID) : Promise<Messages[]> {
        assert(eventID != undefined, "Cannot get message related to an unspecified event");
        return this.messagesRepository.find({
                where : {
                    relatedEvent : eventID.toString()
                },
                order : {
                    dateDebut : "ASC"
                }
            });
    }

    /**
     * @returns Every messages matching body description
     */
    async getMessages(body) : Promise<Messages[]> {
        // Once again, no assert possible on body as it defines constraints for the
        // current query, so an empty body just means no constraints and
        // an invalid body will just return an empty query. Nothing but determined
        // behavior.
        return this.messagesRepository.find({
                where : body,
                order : {
                    dateDebut : "ASC"
                }
            });
    }

    /**
     * Delete a Message
     * 
     * @param id the ID of the message you want to delete
     */
    async deleteMessage(id : ObjectID) : Promise<ControlResponse>{
        assert(id != undefined, "Cannot delete an unspecified message !");
        
        // Delete query
        await this.messagesRepository.delete({
            _id : id
        }).catch( (e) => {
            throw new InternalServerErrorException({
                status : `${e}`,
                error : true
            });
        });
        return {
            status : '',
            error : false
        }
    }

    /**Update a message
     * 
     * @param msg The message updated structure
     * 
     * @requires msg must contains an _id
     */
    async editMessage(msg : Messages) : Promise<ControlResponse>{
        assert(msg != undefined, "Cannot edit an unspecified message")

        let msgFromDB : Messages = await this.messagesRepository.findOne(msg._id);
        if (msgFromDB == undefined) {
            throw new NotFoundException("Couldn't find a message with that ID");
        }
        await this.messagesRepository.save(msg).catch( (e) => {
            throw new BadRequestException({
                status : `${e}`,
                error : true
            });
        });
        return {
            _id : msg._id.toString(),
            status : "",
            error : false
        };
    }

    /**
     * Check if the given ID exists in the event Database
     * 
     * @param id Event identifier that will be checked
     */
    async eventExist(id:ObjectID) : Promise<boolean>{
        assert(id != undefined, "Cannot check if an unspecified event exists !")

        let eventSelection = await this.getEvents({
            _id : id
        })
        return eventSelection.length > 0;
    }
}
