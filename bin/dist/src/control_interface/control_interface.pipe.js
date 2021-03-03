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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePipe = exports.ObjectIDPipe = exports.NormalEventPipe = exports.EventWithCompDatePipe = exports.EventWithIDPipe = exports.EventWithoutIDPipe = exports.UsualPipeFunctions = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
class UsualPipeFunctions {
    static convertID(id) {
        try {
            return new mongodb_1.ObjectID(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`${id} is not a valid ID`);
        }
    }
    static forceIDImportanceCompliance(thing, idImportance) {
        if (thing["_id"] != undefined && idImportance == 0) {
            throw new common_1.BadRequestException("_id cannot be provided for this request");
        }
        if (thing["_id"] == undefined && idImportance == 2) {
            throw new common_1.BadRequestException("_id must be provided for this request");
        }
    }
    static tryToParseDate(date) {
        try {
            return new Date(date);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Could not parse ${date}, is it a well formed ISO string date?`);
        }
    }
    static tryToParseComparativeDate(dateField) {
        try {
            let quantificator;
            let date;
            for (let field in dateField) {
                if (field == '0') {
                    let comparativeType = ["more", "less"];
                    if (!comparativeType.includes(dateField[field])) {
                        throw new common_1.BadRequestException(`${dateField[field]} is not valid date quantificator`);
                    }
                    quantificator = dateField[field];
                }
                else if (field == '1') {
                    date = this.tryToParseDate(dateField[field]);
                }
                else {
                    throw new common_1.BadRequestException("Something is wrong with your dates's array length");
                }
            }
            if (quantificator == "more") {
                return {
                    $gte: date
                };
            }
            else {
                return {
                    $lte: date
                };
            }
        }
        catch (_a) {
            throw new common_1.BadRequestException("Something is wrong with your dates");
        }
    }
}
exports.UsualPipeFunctions = UsualPipeFunctions;
class EventChecker {
    constructor() {
        this.allowedKey = [
            "_id",
            "localisation",
            "impact",
            "dateDebut",
            "dateFin",
            "source",
            "relevant",
            "message",
            "type",
            "info"
        ];
    }
    checkEvent(thingReceived, dateComparative, idImportance) {
        UsualPipeFunctions.forceIDImportanceCompliance(thingReceived, idImportance);
        for (const key in thingReceived) {
            if (this.allowedKey.includes(key)) {
                if (key == "_id") {
                    thingReceived["_id"] = UsualPipeFunctions.convertID(thingReceived["_id"]);
                }
                if (key == "dateDebut" || key == "dateFin") {
                    if (dateComparative) {
                        thingReceived[key] = UsualPipeFunctions.tryToParseComparativeDate(thingReceived[key]);
                    }
                    else {
                        thingReceived[key] = UsualPipeFunctions.tryToParseDate(thingReceived[key]);
                    }
                }
            }
            else {
                throw new common_1.BadRequestException(`${key} is not a valid key`);
            }
        }
        if (thingReceived.dateDebut != undefined && thingReceived.dateFin != undefined) {
            if (thingReceived.dateDebut > thingReceived.dateFin) {
                throw new common_1.BadRequestException("dateDebut happens after dateFin");
            }
        }
        return thingReceived;
    }
}
let EventWithoutIDPipe = class EventWithoutIDPipe {
    transform(thingReceived, metadata) {
        let eventChecker = new EventChecker();
        return eventChecker.checkEvent(thingReceived, false, 0);
    }
};
EventWithoutIDPipe = __decorate([
    common_1.Injectable()
], EventWithoutIDPipe);
exports.EventWithoutIDPipe = EventWithoutIDPipe;
let EventWithIDPipe = class EventWithIDPipe {
    transform(thingReceived, metadata) {
        let eventChecker = new EventChecker();
        return eventChecker.checkEvent(thingReceived, false, 2);
    }
};
EventWithIDPipe = __decorate([
    common_1.Injectable()
], EventWithIDPipe);
exports.EventWithIDPipe = EventWithIDPipe;
class EventWithCompDatePipe {
    transform(thingReceived, metadata) {
        let eventChecker = new EventChecker();
        return eventChecker.checkEvent(thingReceived, true, 1);
    }
}
exports.EventWithCompDatePipe = EventWithCompDatePipe;
class NormalEventPipe {
    transform(thingReceived, metadata) {
        let eventChecker = new EventChecker();
        return eventChecker.checkEvent(thingReceived, false, 1);
    }
}
exports.NormalEventPipe = NormalEventPipe;
let ObjectIDPipe = class ObjectIDPipe {
    transform(thingReceived, metadata) {
        return UsualPipeFunctions.convertID(thingReceived.id);
    }
};
ObjectIDPipe = __decorate([
    common_1.Injectable()
], ObjectIDPipe);
exports.ObjectIDPipe = ObjectIDPipe;
let MessagePipe = class MessagePipe {
    constructor(idImportance, dateComparison) {
        this.dateComparison = dateComparison;
        this.idImportance = idImportance;
    }
    transform(thingReceived, metadata) {
        let allowedKeys = ["_id", "dateDebut", "dateFin", "title", "content", "type", "relatedEvent", "published"];
        UsualPipeFunctions.forceIDImportanceCompliance(thingReceived, this.idImportance);
        for (const key in thingReceived) {
            if (!allowedKeys.includes(key)) {
                throw new common_1.BadRequestException(`${key} is not a valid key`);
            }
            if (key == "_id") {
                thingReceived[key] = UsualPipeFunctions.convertID(thingReceived[key]);
            }
            if (key == "relatedEvent") {
                UsualPipeFunctions.convertID(thingReceived[key]);
            }
            if (key == "dateDebut" || key == "dateFin") {
                if (this.dateComparison) {
                    thingReceived[key] = UsualPipeFunctions.tryToParseComparativeDate(thingReceived[key]);
                }
                else {
                    thingReceived[key] = UsualPipeFunctions.tryToParseDate(thingReceived[key]);
                }
            }
            if (key == "published") {
                if (thingReceived[key] != true && thingReceived[key] != false) {
                    throw new common_1.BadRequestException("published must be a boolean value");
                }
            }
        }
        return thingReceived;
    }
};
MessagePipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Number, Boolean])
], MessagePipe);
exports.MessagePipe = MessagePipe;
//# sourceMappingURL=control_interface.pipe.js.map