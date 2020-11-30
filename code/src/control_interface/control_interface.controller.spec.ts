import { BadRequestException } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import DBModule from '../dbMock'
import { ControlInterfaceController } from './control_interface.controller'
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { Messages } from './control_interface.entity'
import { ObjectID } from "mongodb"

describe('control', () => {
    let controlController : ControlInterfaceController;
    let controlService : ControlInterfaceService;

    beforeEach(async () => {
        jest.setTimeout(10000);
        const module = await Test.createTestingModule({
            imports : [
                DBModule({
                    name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
                }),
                TypeOrmModule.forFeature([EventData, Messages])
            ],
            controllers : [ControlInterfaceController],
            providers : [ControlInterfaceService]
        }).compile();
        controlService = module.get<ControlInterfaceService>(ControlInterfaceService);
        controlController = module.get<ControlInterfaceController>(ControlInterfaceController);
    });

    it("must be able to do CRUD op on events", async () => {
        // Add event
        const responseAdd = await controlController.addEvent({
            source : "testEdit",
            relevant : false,
            message : "Edition Untested"
        });
        expect(responseAdd.error).toBe(false);
        // Edit events
        const responseEdit = await controlController.editEvent({
            _id : responseAdd._id,
            message : "Edition Tested"
        });
        expect(responseEdit.error).toBe(false);
        // Retrieve event
        let responseGet = await controlController.getEvents({
            _id : responseAdd._id
        })
        expect(responseGet[0].message).toBe("Edition Tested")
        // Delete events
        const responseDelete = await controlController.deleteEvent({
            _id : responseAdd._id
        })
        // try to retrieve event
        responseGet = await controlController.getEvents({
            _id : responseAdd._id
        })
        expect(responseGet).toEqual([]);
    })

    it("Should not edit if _id doesn't exist", async () => {
        let errorDetected : boolean = false;
        try {
            await controlController.editEvent({
                _id : new ObjectID("ffffffffffffffffffffffff"),
                message : "Should not work"
            })  
        } catch (error) {
            errorDetected = true
        }
        expect(errorDetected).toBe(true)
        })

     it("should be able to reference an image", async () => {
            // Add event
            const responseAdd = await controlController.addEvent({
                source : "testEdit",
                relevant : false,
                message : "Edition Untested"
            });
            // Add an attachment
            const responseAttach = controlService.registerAttached(new ObjectID(responseAdd._id), `${responseAdd._id}.png`)
            // Retrieve event
            const responseGet = await controlController.getEvents({
                _id : responseAdd._id
            })
            expect(responseGet[0].attachedFile).toBe(`${responseAdd._id}.png`)
        })
});