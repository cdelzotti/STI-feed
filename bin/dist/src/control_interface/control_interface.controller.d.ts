import { ControlInterfaceService } from './control_interface.service';
import { EventData } from '../data/data.entity';
import { ControlResponse } from './control_interface.dto';
import { ObjectID } from 'mongodb';
export declare class ControlInterfaceController {
    private readonly controlInterfaceService;
    constructor(controlInterfaceService: ControlInterfaceService);
    getEvents(body: any): Promise<EventData[]>;
    editEvent(event: any): Promise<ControlResponse>;
    deleteEvent(event: any): Promise<ControlResponse>;
    addEvent(event: any): Promise<ControlResponse>;
    getMsg(msg: any): Promise<import("./control_interface.entity").Messages[]>;
    addMsg(msg: any): Promise<ControlResponse>;
    deleteMessage(id: ObjectID): Promise<ControlResponse>;
    editMessage(msg: any): Promise<ControlResponse>;
    getEventMessages(eventID: any): Promise<import("./control_interface.entity").Messages[]>;
}
