import { Entity, Column, ObjectID, ObjectIdColumn, OneToMany} from 'typeorm';
import { IsString, IsInt, IsBoolean, IsDate } from 'class-validator';
import { EventLinks } from '../control_interface/control_interface.entity'


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

    @IsBoolean()
    @Column()
    relevant? : boolean;

    @IsString()
    @Column({ nullable: true })
    message? : string;

    @IsString()
    @Column({ nullable: true })
    type? : string;

    @IsString()
    @Column({ nullable: true })
    info? : string;

    @IsString()
    @Column({ nullable: true })
    attachedFile? : string;

    @OneToMany(() => EventLinks, links => links.link)
    links : EventLinks[];
}