import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataController } from './data.controller'
import { DataService } from './data.service'
import { EventData } from './data.entity'
import DBModule from '../dbMock'

describe('dataController', () => {
    let dataController : DataController;
    let dataService : DataService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                DBModule({
                    name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
                  }),
                TypeOrmModule.forFeature([EventData])
            ],
            controllers : [DataController],
            providers : [DataService]
        }).compile();
        dataService = module.get<DataService>(DataService);
        dataController = module.get<DataController>(DataController);
    });

    it("Should add stuff in db without error", async () => {
        const dataResponse = await dataController.getAP(true)
        expect(dataResponse.error).toBe(false);
        expect(dataResponse.update).toBe("AP");
        expect(dataResponse.status).toBe("");
    })
});