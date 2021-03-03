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
exports.EventsService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const environment_1 = require("../environments/environment");
let EventsService = class EventsService {
    constructor(http) {
        this.http = http;
    }
    getCurrentMessages() {
        let eventUrl = `${environment_1.environment.baseUrl}output/msg/`;
        let today = new Date();
        let formattedString = [];
        if (today.getDate() < 10) {
            formattedString.push(`0${today.getDate()}`);
        }
        else {
            formattedString.push(`${today.getDate()}`);
        }
        if (today.getMonth() < 10) {
            formattedString.push(`0${today.getMonth() + 1}`);
        }
        else {
            formattedString.push(`${today.getMonth() + 1}`);
        }
        return this.http.post(eventUrl, {
            dateDebut: [
                "less", `${today.getFullYear()}-${formattedString[1]}-${formattedString[0]}T00:00:00.000Z`
            ],
            dateFin: [
                "more", `${today.getFullYear()}-${formattedString[1]}-${formattedString[0]}T00:00:00.000Z`
            ]
        });
    }
    getMessageById(id) {
        let eventUrl = `${environment_1.environment.baseUrl}output/msg/`;
        return this.http.post(eventUrl, {
            _id: id
        });
    }
    static beautifulDate(uglyDate) {
        let numberToMonth = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];
        let date = uglyDate.split("T")[0];
        let dateComponents = date.split("-");
        return `${+dateComponents[2]} ${numberToMonth[+dateComponents[1] - 1]} ${dateComponents[0]}`;
    }
};
EventsService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map