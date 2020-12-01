import { Entity, Column, ObjectID, ObjectIdColumn, ManyToOne, Unique} from 'typeorm';
import { IsString, IsInt, IsBoolean, IsDate } from 'class-validator';
import { EventData } from '../data/data.entity'

@Entity("Messages")
export class Messages{
    @IsString()
    @ObjectIdColumn()
    _id? : ObjectID;

    @Column({ nullable: true })
    @IsDate()
    dateDebut? : Date;

    @Column({ nullable: true })
    @IsDate()
    dateFin? : Date;

    @IsString()
    @Column()
    title? : string;

    @Column()
    @IsString()
    content? : string;

    @Column()
    @IsString()
    type? : string;
    
    @Column()
    @IsString()
    relatedEvent? : string;
}