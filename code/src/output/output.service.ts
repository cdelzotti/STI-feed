import { Injectable, Post } from '@nestjs/common';
import { Db, Repository, Equal } from 'typeorm';
import { EventData } from '../data/data.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { min } from 'class-validator';

@Injectable()
export class OutputService {
  
    constructor(
        // Create variable needed to access database
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>
    ){}

    /**
     * @returns Every events marked as relevant
     */
    async getPublicEvents() : Promise<EventData[]> {
        // Get curent date
        let hourLessDay : Date = new Date();
        // remove minutes
        hourLessDay.setHours(0, 0, 0, 0)
        return this.eventRepository.find({
            where : {
                relevant : true,
                dateFin : {$gte: hourLessDay}
            },
            order : {
                dateDebut : "ASC"
            }
        });
    }

}
