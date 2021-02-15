import { Entity, Column, ObjectID, ObjectIdColumn} from 'typeorm';
import { IsString, IsBoolean, IsDate } from 'class-validator';


@Entity("EventData")
export class EventData{
    @IsString()
    @ObjectIdColumn()
    _id? : ObjectID;

    @IsString()
    @Column({ nullable: true })
    localisation? : string;

    @Column({ nullable: true })
    @IsString()
    impact? : string;
    
    @Column({ nullable: true })
    @IsDate()
    dateDebut? : Date;

    @Column({ nullable: true })
    @IsDate()
    dateFin? : Date;

    @Column({ nullable: true })
    @IsString()
    source? : string;

    @IsString()
    @Column({ nullable: true })
    type? : string;

    @IsString()
    @Column({ nullable: true })
    info? : string;
}