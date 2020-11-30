import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OutputController } from './output.controller'
import { OutputService } from './output.service'
import { EventData } from '../data/data.entity'
import { Messages } from '../control_interface/control_interface.entity'
import DBModule from '../dbMock'

describe('outputController', () => {
    let outputController : OutputController;
    let outputService : OutputService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                DBModule({
                    name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
                  }),
                TypeOrmModule.forFeature([EventData, Messages])
            ],
            controllers : [OutputController],
            providers : [OutputService]
        }).compile();
        outputService = module.get<OutputService>(OutputService);
        outputController = module.get<OutputController>(OutputController);
    });

    it("should not crash", async () => {
        expect(await outputService.getPublicEvents()).toEqual([]);
    })
});