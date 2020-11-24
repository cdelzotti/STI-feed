// Huge thanks to Enrique Arrieta who helped me setting up my tests !
// https://earrieta.dev/mocking-our-mongodb-while-testing-in-nestjs-ck1a316df00izjfs1adaw9li6

import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DBMock } from '../dbMock'
import { DataController } from './data.controller'
import { DataService } from './data.service'
import { EventData } from './data.entity'


describe('dataController', () => {
    let dataController : DataController;
    let dataService : DataService;
    let dbMock : DBMock = DBMock.getInstance();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                dbMock.getConfig(),
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