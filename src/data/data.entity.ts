import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity("EventData")
export class EventData{
    @PrimaryGeneratedColumn()
    id? : number;
    @Column({ nullable: true })
    localisation? : string;
    @Column({ nullable: true })
    impact? : string;
    @Column({ nullable: true })
    dateDebut? : Date;
    @Column({ nullable: true })
    dateFin? : Date;
    @Column({ nullable: true })
    source? : string;
    @Column()
    relevant? : boolean;
    @Column({ nullable: true })
    message? : string;
    @Column({ nullable: true })
    type? : string;
    @Column({ nullable: true })
    info? : string;
}