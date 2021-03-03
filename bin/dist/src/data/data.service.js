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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const typeorm_1 = require("typeorm");
const data_entity_1 = require("./data.entity");
const typeorm_2 = require("@nestjs/typeorm");
const assert = require("assert");
let DataService = class DataService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async APextract(path) {
        assert(path != "", "Path must be specified");
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile(path);
        let worksheet = workbook.worksheets[0];
        for (let row = 2; row < worksheet.actualRowCount; row++) {
            if (worksheet.getCell(`D${row}`).value != null) {
                let currentEvent = new data_entity_1.EventData();
                currentEvent.localisation = worksheet.getCell(`C${row}`).value;
                currentEvent.type = "AP";
                currentEvent.impact = worksheet.getCell(`E${row}`).value;
                currentEvent.dateDebut = worksheet.getCell(`F${row}`).value;
                currentEvent.dateFin = worksheet.getCell(`G${row}`).value;
                currentEvent.source = worksheet.getCell(`H${row}`).value;
                currentEvent.info = worksheet.getCell(`N${row}`).value;
                let dbContent = await this.eventRepository.find({
                    type: currentEvent.type,
                    localisation: currentEvent.localisation,
                    impact: currentEvent.impact,
                    source: currentEvent.source,
                    info: currentEvent.info,
                });
                let matches = this.workAroundForDates(currentEvent, dbContent);
                if (matches == 0) {
                    await this.eventRepository.insert(currentEvent).catch((reason) => {
                        console.log("Adding AP failed");
                        throw new common_1.InternalServerErrorException("Something went wrong while retreiving events");
                    }).then(() => {
                        console.log("AP added");
                    });
                }
            }
        }
        return {
            update: "AP",
            status: "",
            error: false,
        };
    }
    workAroundForDates(currentEvent, dbContent) {
        assert(currentEvent != undefined && dbContent != undefined);
        let matches = 0;
        try {
            var currentEventStart = [
                currentEvent.dateDebut.getFullYear(),
                currentEvent.dateDebut.getMonth(),
                currentEvent.dateDebut.getDate()
            ];
            var currentEventEnd = [
                currentEvent.dateFin.getFullYear(),
                currentEvent.dateFin.getMonth(),
                currentEvent.dateFin.getDate()
            ];
        }
        catch (e) {
            console.log("Couldn't parse date, is there a null date ?");
            return 1;
        }
        for (let index = 0; index < dbContent.length; index++) {
            let startDate = [
                dbContent[index].dateDebut.getFullYear(),
                dbContent[index].dateDebut.getMonth(),
                dbContent[index].dateDebut.getDate()
            ];
            let endDate = [
                dbContent[index].dateFin.getFullYear(),
                dbContent[index].dateFin.getMonth(),
                dbContent[index].dateFin.getDate()
            ];
            if (this.arrayEquals(startDate, currentEventStart) && this.arrayEquals(endDate, currentEventEnd)) {
                matches++;
            }
        }
        return matches;
    }
    arrayEquals(a1, a2) {
        assert(a1.length >= 0 && a2.length >= 0, "Args cannot use length property, they cannot be arrays !");
        if (a1.length == a2.length) {
            for (let index = 0; index < a1.length; index++) {
                if (a1[index] != a2[index]) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }
};
DataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(data_entity_1.EventData)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map