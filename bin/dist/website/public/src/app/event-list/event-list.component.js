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
exports.EventListComponent = void 0;
const core_1 = require("@angular/core");
const events_service_1 = require("./../events.service");
const router_1 = require("@angular/router");
let EventListComponent = class EventListComponent {
    constructor(eventService, activateRoute) {
        this.eventService = eventService;
        this.activateRoute = activateRoute;
    }
    getMessages() {
        this.eventService.getCurrentMessages().subscribe(messages => {
            this.messages = messages;
        });
    }
    ngOnInit() {
        this.getMessages();
    }
    applyBeautifulDate(date) {
        return events_service_1.EventsService.beautifulDate(date);
    }
};
EventListComponent = __decorate([
    core_1.Component({
        selector: 'event-list',
        templateUrl: './event-list.component.html',
        styleUrls: ['./event-list.component.css']
    }),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        router_1.ActivatedRoute])
], EventListComponent);
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map