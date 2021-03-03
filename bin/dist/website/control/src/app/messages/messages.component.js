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
exports.MessagesComponent = void 0;
const core_1 = require("@angular/core");
const events_service_1 = require("../events.service");
const router_1 = require("@angular/router");
let MessagesComponent = class MessagesComponent {
    constructor(eventsServices, router, route) {
        this.eventsServices = eventsServices;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        this.route.params.subscribe(param => {
            this.getMessages(param.type);
        });
    }
    getMessages(typeRequired) {
        this.messages = [];
        if (typeRequired == "current") {
            this.eventsServices.getIncomingMessage().subscribe((messages) => {
                this.messages = messages;
                this.getRelatedEventType();
            });
        }
        else {
            this.eventsServices.getOldMessage().subscribe((messages) => {
                this.messages = messages;
                this.getRelatedEventType();
            });
        }
    }
    publish(id, publishState) {
        this.eventsServices.updateMesssage({
            _id: id,
            published: publishState
        }).subscribe((response) => {
            this.ngOnInit();
        });
    }
    delete(id) {
        this.eventsServices.deleteMessage(id).subscribe((response) => {
            this.ngOnInit();
        });
    }
    getRelatedEventType() {
        for (let index = 0; index < this.messages.length; index++) {
            this.messages[index].relatedType = "Chargement en cours";
            if (this.messages[index].relatedEvent == "" || this.messages[index].relatedEvent == undefined) {
                this.messages[index].relatedType = "Indépendant";
            }
            else {
                this.eventsServices.getSpecificEvents({
                    _id: this.messages[index].relatedEvent
                }).subscribe(event => {
                    if (event.length == 0) {
                        this.messages[index].relatedType = "Évènement introuvable";
                    }
                    else {
                        this.messages[index].relatedType = event[0].type;
                    }
                });
            }
        }
    }
    applyDateChanges(date) {
        return events_service_1.EventsService.beautifulDate(date);
    }
};
MessagesComponent = __decorate([
    core_1.Component({
        selector: 'messages',
        templateUrl: './messages.component.html',
        styleUrls: ['./messages.component.css']
    }),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        router_1.Router,
        router_1.ActivatedRoute])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map