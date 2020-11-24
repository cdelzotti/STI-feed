import { TypeOrmModule } from '@nestjs/typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { EventData } from './data/data.entity'
import { EventLinks } from './control_interface/control_interface.entity'
/**
 * Generates a false database used for testing.
 * 
 * To avoid any mistakes that would lead to thousands of different databases
 * making your hardrive struggling to survive, this class is conceived has
 * a Singleton.
 */
export class DBMock{
    private static instance : DBMock;
    // The database mockup
    private db : MongoMemoryServer;

    private constructor(){
        this.db = new MongoMemoryServer();
    }


    static getInstance(){
        if(!DBMock.instance){
            DBMock.instance = new DBMock();
        }
        return DBMock.instance;
    }


    /**
     * Returns the database configuration
     */
    async getConfig() {
        return TypeOrmModule.forRoot({
            type : "mongodb",
            host : "localhost",
            database : await this.db.getDbName(),
            port : await this.db.getPort(),
            synchronize : true,
            entities : [
              EventData,
              EventLinks
            ],
            useUnifiedTopology : true
        })
    }
}