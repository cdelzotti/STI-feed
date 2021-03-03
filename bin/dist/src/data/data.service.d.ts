import { Repository } from 'typeorm';
import { EventData } from './data.entity';
import { DataResponse } from './data.dto';
export declare class DataService {
    private eventRepository;
    constructor(eventRepository: Repository<EventData>);
    APextract(path: string): Promise<DataResponse>;
    workAroundForDates(currentEvent: EventData, dbContent: EventData[]): number;
    arrayEquals(a1: any, a2: any): boolean;
}
