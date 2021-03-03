import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ObjectID } from 'mongodb';
export declare class UsualPipeFunctions {
    static convertID(id: string): any;
    static forceIDImportanceCompliance(thing: any, idImportance: Number): void;
    static tryToParseDate(date: string): Date;
    static tryToParseComparativeDate(dateField: Array<string>): {
        $gte: Date;
        $lte?: undefined;
    } | {
        $lte: Date;
        $gte?: undefined;
    };
}
export declare class EventWithoutIDPipe implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): any;
}
export declare class EventWithIDPipe implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): any;
}
export declare class EventWithCompDatePipe implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): any;
}
export declare class NormalEventPipe implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): any;
}
export declare class ObjectIDPipe implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): ObjectID;
}
export declare class MessagePipe implements PipeTransform {
    idImportance: number;
    dateComparison: boolean;
    constructor(idImportance: number, dateComparison: boolean);
    transform(thingReceived: any, metadata: ArgumentMetadata): ObjectID;
}
