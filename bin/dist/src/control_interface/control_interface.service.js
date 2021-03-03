"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlInterfaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const data_entity_1 = require("../data/data.entity");
const control_interface_entity_1 = require("./control_interface.entity");
const typeorm_2 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const assert = require("assert");
let ControlInterfaceService = class ControlInterfaceService {
    constructor(eventRepository, messagesRepository) {
        this.eventRepository = eventRepository;
        this.messagesRepository = messagesRepository;
    }
    async getEvents(body) {
        return this.eventRepository.find({
            where: body,
            order: {
                dateDebut: "ASC"
            }
        });
    }
    async editEvent(eventID, event) {
        assert(eventID != undefined, "Cannnot edit event without ID!");
        assert(event != undefined && event != {}, "Cannnot edit event without an event body !");
        let eventFromDB = await this.eventRepository.findOne(eventID);
        if (eventFromDB == undefined) {
            throw new common_1.NotFoundException("Couldn't find an event with that ID");
        }
        await this.eventRepository.save(event).catch((e) => {
            throw new common_1.BadRequestException({
                status: `${e}`,
                error: true
            });
        });
        return {
            _id: event._id,
            status: "",
            error: false
        };
    }
    async deleteEvent(event) {
        await this.eventRepository.delete(event).catch((e) => {
            throw new common_1.BadRequestException({
                status: `${e}`,
                error: true
            });
        });
        return {
            _id: event._id,
            status: "",
            error: false
        };
    }
    async addEvent(event) {
        assert(event != undefined && event != {}, "Cannnot create event without an event body !");
        await this.eventRepository.insert(event).catch((e) => {
            throw new common_1.BadRequestException({
                status: `${e}`,
                error: true
            });
        });
        return {
            _id: event._id,
            status: "",
            error: false
        };
    }
    async addMessage(message) {
        assert(message != undefined, "Cannnot create event message without a message body !");
        if (message.relatedEvent != undefined) {
            if (!await this.eventExist(new mongodb_1.ObjectID(message.relatedEvent))) {
                throw new common_1.BadRequestException(`${message.relatedEvent} n'est associé à aucun évènement`);
            }
        }
        if (message.published == undefined) {
            message.published = false;
        }
        await this.messagesRepository.insert(message).catch((e => {
            throw new common_1.InternalServerErrorException({
                status: `${e}`,
                error: true
            });
        }));
        return {
            _id: message._id.toString(),
            status: "",
            error: false
        };
    }
    async getEventMessage(eventID) {
        assert(eventID != undefined, "Cannot get message related to an unspecified event");
        return this.messagesRepository.find({
            where: {
                relatedEvent: eventID.toString()
            },
            order: {
                dateDebut: "ASC"
            }
        });
    }
    async getMessages(body) {
        return this.messagesRepository.find({
            where: body,
            order: {
                dateDebut: "ASC"
            }
        });
    }
    async deleteMessage(id) {
        assert(id != undefined, "Cannot delete an unspecified message !");
        await this.messagesRepository.delete({
            _id: id
        }).catch((e) => {
            throw new common_1.InternalServerErrorException({
                status: `${e}`,
                error: true
            });
        });
        return {
            status: '',
            error: false
        };
    }
    async editMessage(msg) {
        assert(msg != undefined, "Cannot edit an unspecified message");
        let msgFromDB = await this.messagesRepository.findOne(msg._id);
        if (msgFromDB == undefined) {
            throw new common_1.NotFoundException("Couldn't find a message with that ID");
        }
        await this.messagesRepository.save(msg).catch((e) => {
            throw new common_1.BadRequestException({
                status: `${e}`,
                error: true
            });
        });
        return {
            _id: msg._id.toString(),
            status: "",
            error: false
        };
    }
    async eventExist(id) {
        assert(id != undefined, "Cannot check if an unspecified event exists !");
        let eventSelection = await this.getEvents({
            _id: id
        });
        return eventSelection.length > 0;
    }
};
ControlInterfaceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(data_entity_1.EventData)),
    __param(1, typeorm_2.InjectRepository(control_interface_entity_1.Messages)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ControlInterfaceService);
exports.ControlInterfaceService = ControlInterfaceService;
//# sourceMappingURL=control_interface.service.js.map