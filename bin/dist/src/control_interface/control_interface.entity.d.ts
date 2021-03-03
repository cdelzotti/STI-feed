import { ObjectID } from 'typeorm';
export declare class Messages {
    _id?: ObjectID;
    dateDebut?: Date;
    dateFin?: Date;
    title?: string;
    content?: string;
    type?: string;
    published: boolean;
    relatedEvent?: string;
}
