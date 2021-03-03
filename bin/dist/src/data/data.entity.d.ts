import { ObjectID } from 'typeorm';
export declare class EventData {
    _id?: ObjectID;
    localisation?: string;
    impact?: string;
    dateDebut?: Date;
    dateFin?: Date;
    source?: string;
    type?: string;
    info?: string;
}
