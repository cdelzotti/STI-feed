import { BadRequestException, InternalServerErrorException, NotFoundException ,Injectable, Post} from '@nestjs/common';
import { Db, Repository, Equal, MoreThan} from 'typeorm';
import { EventData } from '../data/data.entity'
import { Messages } from './control_interface.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ControlResponse } from './control_interface.dto'
import { ObjectID } from 'mongodb'


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
        event["attachedFile"] = ""
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
            throw new BadRequestException({
                status : `${e}`,
                error : true
            });
        });
        return {
            status : "",
            error : false
        };
    }


    /**
     * Add a message into the db
     * 
     * @param eventID Event identifier
     * @param message Message that should be added to the DB
     */
    async addMessage(message : Messages) : Promise<ControlResponse> {
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
        return this.messagesRepository.find({
                where : {
                    relatedEvent : eventID
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
        let msgFromDB : Messages = await this.messagesRepository.findOne(msg._id);
        if (msgFromDB == undefined) {
            throw new NotFoundException("Couldn't find an event with that ID");
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
}
