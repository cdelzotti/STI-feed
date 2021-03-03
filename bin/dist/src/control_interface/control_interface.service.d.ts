import { Repository } from 'typeorm';
import { EventData } from '../data/data.entity';
import { Messages } from './control_interface.entity';
import { ControlResponse } from './control_interface.dto';
import { ObjectID } from 'mongodb';
export declare class ControlInterfaceService {
    private eventRepository;
    private messagesRepository;
    constructor(eventRepository: Repository<EventData>, messagesRepository: Repository<Messages>);
    getEvents(body: any): Promise<EventData[]>;
    editEvent(eventID: ObjectID, event: any): Promise<ControlResponse>;
    deleteEvent(event: any): Promise<ControlResponse>;
    addEvent(event: any): Promise<ControlResponse>;
    addMessage(message: Messages): Promise<ControlResponse>;
    getEventMessage(eventID: ObjectID): Promise<Messages[]>;
    getMessages(body: any): Promise<Messages[]>;
    deleteMessage(id: ObjectID): Promise<ControlResponse>;
    editMessage(msg: Messages): Promise<ControlResponse>;
    eventExist(id: ObjectID): Promise<boolean>;
}
