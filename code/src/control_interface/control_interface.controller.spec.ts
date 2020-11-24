// Huge thanks to Enrique Arrieta who helped me setting up my tests !
// https://earrieta.dev/mocking-our-mongodb-while-testing-in-nestjs-ck1a316df00izjfs1adaw9li6

import { BadRequestException } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DBMock } from '../dbMock'
import { ControlInterfaceController } from './control_interface.controller'
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { EventLinks } from './control_interface.entity'


describe('dataController', () => {
    let controlController : ControlInterfaceController;
    let controlService : ControlInterfaceService;
    let dbMock : DBMock = DBMock.getInstance();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                dbMock.getConfig(),
                TypeOrmModule.forFeature([EventData, EventLinks])
            ],
            controllers : [ControlInterfaceController],
            providers : [ControlInterfaceService]
        }).compile();
        controlService = module.get<ControlInterfaceService>(ControlInterfaceService);
        controlController = module.get<ControlInterfaceController>(ControlInterfaceController);
        // Put something in DB
        await controlService.addEvent({
            source : "testing",
            relevant : false,
        })
    });

    it("should retreive events", async () => {
        const response = await controlController.getEvents({})
        for (const item in response) {
            expect(response[item]).toBeInstanceOf(EventData)
        }
    })

});