import { BadRequestException } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import DBModule from '../dbMock'
import { ControlInterfaceController } from './control_interface.controller'
import { ControlInterfaceService } from './control_interface.service'
import { EventData } from '../data/data.entity'
import { Messages } from './control_interface.entity'
import { ObjectID } from "mongodb"
import { response } from "express"

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

        it("should be able to do CRUD actions for msg", async () => {
            // Add an event for referencial purpose
            // Add event
            const responseAdd = await controlController.addEvent({
                source : "testMsg",
                relevant : false,
                message : "Msg placeholder event"
            });
            expect(responseAdd.error).toBe(false);
            // Add a message
            let responseMsgAdd = await controlController.addMsg(new ObjectID(responseAdd._id), {
                dateDebut : "2020-11-30T00:00:00.000Z",
                dateFin : "2020-12-30T00:00:00.000Z",
                title : "Test message",
                content : "PLOUF",
                type : "TEST"
            })
            expect(responseMsgAdd.error).toBe(false);
            // retreive a message
            let responseGetMsg = await controlController.getMsg({
                _id : new ObjectID(responseMsgAdd._id)
            });
            expect(responseGetMsg[0].title).toBe("Test message");
            // Edit a message
            let responseEditMsg = await controlController.editMessage({
                _id : new ObjectID(responseMsgAdd._id),
                title : "EDITED TITLE"
            })
            expect(responseEditMsg.error).toBe(false);
            let responseGetMsgAfterEdit = await controlController.getMsg({
                title : "EDITED TITLE"
            });
            expect(responseGetMsgAfterEdit[0].title).toBe("EDITED TITLE");
        })
});