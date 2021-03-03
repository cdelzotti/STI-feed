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
const http_2 = require("@angular/common/http");
const environment_1 = require("../environments/environment");
const assert = require("assert");
let EventsService = class EventsService {
    constructor(http) {
        this.http = http;
        this.httpOpt = {
            headers: new http_2.HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            })
        };
        this.refreshHeaders();
    }
    refreshHeaders() {
        this.httpOpt = {
            headers: new http_2.HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            })
        };
    }
    refreshEvents() {
        let eventUrl = `${environment_1.environment.baseUrl}data/update-ap/`;
        return this.http.post(eventUrl, {
            await: true
        }, this.httpOpt);
    }
    getEvents() {
        let eventUrl = `${environment_1.environment.baseUrl}control/select-event/`;
        let hourLessDay = new Date();
        hourLessDay.setHours(0, 0, 0, 0);
        let body = {
            dateFin: ["more", hourLessDay.toISOString()]
        };
        return this.http.post(eventUrl, body, this.httpOpt);
    }
    getSpecificEvents(body) {
        let eventUrl = `${environment_1.environment.baseUrl}control/select-event/`;
        return this.http.post(eventUrl, body, this.httpOpt);
    }
    editEvent(body) {
        assert(body._id != undefined, "Event edition must provide identifier");
        let eventUrl = `${environment_1.environment.baseUrl}control/event/`;
        return this.http.put(eventUrl, body, this.httpOpt);
    }
    createEvent(body) {
        assert(body._id == undefined, "Event creation cannot provide identifier");
        let eventUrl = `${environment_1.environment.baseUrl}control/event/`;
        return this.http.post(eventUrl, body, this.httpOpt);
    }
    postMessage(body) {
        assert(body._id == undefined, "Message creation cannot provide identifier");
        let url = `${environment_1.environment.baseUrl}control/msg/`;
        return this.http.post(url, body, this.httpOpt);
    }
    getMessages(body) {
        let url = `${environment_1.environment.baseUrl}control/getMsg/`;
        return this.http.post(url, body, this.httpOpt);
    }
    getIncomingMessage() {
        let hourLessDay = new Date();
        hourLessDay.setHours(0, 0, 0, 0);
        let body = {
            dateFin: ["more", hourLessDay.toISOString()]
        };
        let url = `${environment_1.environment.baseUrl}control/getMsg/`;
        return this.http.post(url, body, this.httpOpt);
    }
    getOldMessage() {
        let hourLessDay = new Date();
        hourLessDay.setHours(0, 0, 0, 0);
        let body = {
            dateFin: ["less", hourLessDay.toISOString()]
        };
        let url = `${environment_1.environment.baseUrl}control/getMsg/`;
        return this.http.post(url, body, this.httpOpt);
    }
    updateMesssage(body) {
        assert(body._id != undefined, "Message edition must provide identifier");
        let url = `${environment_1.environment.baseUrl}control/msg/`;
        return this.http.put(url, body, this.httpOpt);
    }
    deleteMessage(messageID) {
        assert(messageID != "", "Message deletion must provide identifier");
        let url = `${environment_1.environment.baseUrl}control/msg/${messageID}`;
        return this.http.delete(url, this.httpOpt);
    }
    login(user, password) {
        assert(user != "" && password != "", "Login must provide creditentials");
        let url = `${environment_1.environment.baseUrl}user/auth/`;
        return this.http.post(url, {
            username: user,
            password: password
        }, this.httpOpt);
    }
    postFile(fileToUpload) {
        assert(fileToUpload != undefined, "fileToUpload must be specified");
        let url = `${environment_1.environment.baseUrl}cloud/`;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData, this.httpOpt);
    }
    checkAuth() {
        let url = `${environment_1.environment.baseUrl}user/checkauth/`;
        return this.http.get(url, this.httpOpt);
    }
    static beautifulDate(uglyDate) {
        assert(uglyDate != "", "Cannot parse an empty string");
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