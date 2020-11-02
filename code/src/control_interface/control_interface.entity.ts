import { Entity, Column, ObjectID, ObjectIdColumn, ManyToOne, Unique} from 'typeorm';
import { IsString, IsInt, IsBoolean, IsDate } from 'class-validator';
import { EventData } from '../data/data.entity'

@Entity("EventLinks")
@Unique(["name"])
export class EventLinks{
    @IsString()
    @ObjectIdColumn()
    _id? : ObjectID;

    @IsString()
    @Column()
    name? : string;

    @Column()
    @IsString()
    link? : string;
    
    @ManyToOne(() => EventData, relatedEvent => relatedEvent.links)
    relatedEvent : EventData;
}