import { Entity, Column, ObjectID, ObjectIdColumn, ManyToOne, Unique} from 'typeorm';
import { IsString, IsInt, IsBoolean, IsDate, isBoolean } from 'class-validator';
import { EventData } from '../data/data.entity'

@Entity("Upload")
export class Upload{
    @IsString()
    @ObjectIdColumn()
    _id? : ObjectID;
}