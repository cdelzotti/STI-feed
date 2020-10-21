import { Injectable, Post } from '@nestjs/common';
import { Db, Repository, Equal } from 'typeorm';
import { EventData } from '../data/data.entity'
import { InjectRepository } from '@nestjs/typeorm'

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

        return this.eventRepository.find({
            "relevant" : true
        });
    }

}
