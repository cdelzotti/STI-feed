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
exports.MessageEditionComponent = void 0;
const core_1 = require("@angular/core");
const events_service_1 = require("../events.service");
const router_1 = require("@angular/router");
const environment_1 = require("../../environments/environment");
const event_list_component_1 = require("../event-list/event-list.component");
const assert = require("assert");
let MessageEditionComponent = class MessageEditionComponent {
    constructor(eventService, router, route) {
        this.eventService = eventService;
        this.router = router;
        this.route = route;
        this.backUrl = environment_1.environment.baseUrl;
        this.route.params.subscribe(param => {
            if (param.id != "new") {
                this.newMessage = false;
                this.eventService.getMessages({
                    _id: param.id
                }).subscribe(message => {
                    this.id = param.id;
                    this.relatedEvent = message[0].relatedEvent;
                    if (message[0].dateDebut != undefined) {
                        this.dateDebut = message[0].dateDebut.split("T")[0];
                    }
                    else {
                        this.dateDebut = undefined;
                    }
                    if (message[0].dateFin != undefined) {
                        this.dateFin = message[0].dateFin.split("T")[0];
                    }
                    else {
                        this.dateFin = undefined;
                    }
                    this.published = message[0].published;
                    this.title = message[0].title;
                    this.type = message[0].type;
                    this.content = message[0].content;
                    if (this.relatedEvent != undefined) {
                        this.eventService.getSpecificEvents({
                            _id: this.relatedEvent
                        }).subscribe(relatedEvent => {
                            this.event = relatedEvent[0];
                        });
                    }
                });
            }
            else {
                this.newMessage = true;
            }
        });
    }
    ngOnInit() {
        this.published = true;
    }
    uploadFile(files) {
        assert(files != undefined);
        this.eventService.postFile(files.item(0)).subscribe(response => {
            this.fileLink = response["link"];
        });
    }
    addMessage() {
        this.errorMessage = "";
        if (this.dateDebut == undefined) {
            this.errorMessage = "Date de commencement non spécifiée";
        }
        else if (this.dateFin == undefined) {
            this.errorMessage = "Date de fin non spécifiée";
        }
        else if (this.title == undefined) {
            this.errorMessage = "Titre non spécifié";
        }
        else if (this.content == undefined) {
            this.errorMessage = "Aucun contenu n'est spécifié";
        }
        else if (!event_list_component_1.happensBefore(this.dateDebut, this.dateFin)) {
            this.errorMessage = "La date de début arrive après la date de fin.";
        }
        else {
            if (this.type == undefined) {
                this.type = "Annonce";
            }
            let returnPage;
            let dateGiven = this.dateFin.split("-");
            let currentDate = new Date();
            if (this.newMessage) {
                this.eventService.postMessage({
                    dateDebut: `${this.dateDebut}T00:00:00.000Z`,
                    dateFin: `${this.dateFin}T00:00:00.000Z`,
                    title: this.title,
                    content: this.content,
                    published: this.published,
                    type: this.type
                }).subscribe((response) => {
                    if (response.error) {
                        this.errorMessage = response.status;
                    }
                    else {
                        this.router.navigateByUrl("/messages/current");
                    }
                });
            }
            else {
                this.eventService.updateMesssage({
                    _id: this.id,
                    relatedEvent: this.relatedEvent,
                    dateDebut: `${this.dateDebut}T00:00:00.000Z`,
                    dateFin: `${this.dateFin}T00:00:00.000Z`,
                    title: this.title,
                    content: this.content,
                    published: this.published,
                    type: this.type
                }).subscribe(response => {
                    if (response.error) {
                        this.errorMessage = response.status;
                    }
                    else {
                        this.router.navigateByUrl("/messages/current");
                    }
                });
            }
        }
    }
};
MessageEditionComponent = __decorate([
    core_1.Component({
        selector: 'app-message-edition',
        templateUrl: './message-edition.component.html',
        styleUrls: ['./message-edition.component.css']
    }),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        router_1.Router,
        router_1.ActivatedRoute])
], MessageEditionComponent);
exports.MessageEditionComponent = MessageEditionComponent;
//# sourceMappingURL=message-edition.component.js.map