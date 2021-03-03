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
exports.EventListCreateDialog = exports.EventListEditDialog = exports.EventListComponent = exports.happensBefore = void 0;
const core_1 = require("@angular/core");
const events_service_1 = require("./../events.service");
const dialog_1 = require("@angular/material/dialog");
const environment_1 = require("../../environments/environment");
const router_1 = require("@angular/router");
const assert = require("assert");
function happensBefore(date1, date2) {
    let splitDate1 = date1.split("-");
    let splitDate2 = date2.split("-");
    assert(splitDate1.length == 3 && splitDate2.length == 3);
    if (+splitDate2[0] < +splitDate1[0]) {
        return false;
    }
    else if (+splitDate2[0] == +splitDate1[0] && +splitDate2[1] < +splitDate1[1]) {
        return false;
    }
    else if (+splitDate2[0] == +splitDate1[0] && +splitDate2[1] == +splitDate1[1] && +splitDate2[2] < +splitDate1[2]) {
        return false;
    }
    return true;
}
exports.happensBefore = happensBefore;
let EventListComponent = class EventListComponent {
    constructor(eventService, dialog, router, route) {
        this.eventService = eventService;
        this.dialog = dialog;
        this.router = router;
        this.route = route;
        this.eventRetreiver = (eventID) => {
            let returnEvent;
            this.events.forEach((event, index, array) => {
                if (event._id == eventID) {
                    returnEvent = event;
                }
            });
            return returnEvent;
        };
    }
    getEvents() {
        this.eventService.getEvents().subscribe(events => (this.events = events));
    }
    async refreshEvents() {
        this.refreshMessage = "Rafraichissement en cours...";
        this.eventService.refreshEvents().subscribe(response => {
            if (!response.error) {
                this.ngOnInit();
                this.refreshMessage = "";
            }
            else {
                this.refreshMessage = "Une erreur est survenue, impossible de rafraichir tous les évènements.";
            }
        });
    }
    edit(id) {
        assert(id != "");
        let event = this.eventRetreiver(id);
        const dialogRef = this.dialog.open(EventListEditDialog, {
            data: {
                eventEdit: event,
                fromPage: this
            }
        });
        dialogRef.afterClosed().subscribe();
    }
    addEvent() {
        const dialogRef = this.dialog.open(EventListCreateDialog, {
            data: {
                fromPage: this,
                closingCallback: () => {
                    dialogRef.close();
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.ngOnInit();
        });
    }
    addMessage(id) {
        assert(id != "");
        this.eventService.postMessage({
            relatedEvent: id
        }).subscribe(response => {
            this.router.navigate([`/messages/current/message-edit/${response._id}`], { relativeTo: this.route, skipLocationChange: true });
        });
    }
    ngOnInit() {
        this.getEvents();
    }
    applyDateChanges(date) {
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
        dialog_1.MatDialog,
        router_1.Router,
        router_1.ActivatedRoute])
], EventListComponent);
exports.EventListComponent = EventListComponent;
let EventListEditDialog = class EventListEditDialog {
    constructor(dialogRef, data, eventService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.eventService = eventService;
        this.eventToEdit = data.eventEdit;
        this.fromPage = data.fromPage;
        this.backUrl = environment_1.environment.baseUrl;
    }
    submit() {
        this.eventService.editEvent({
            _id: this.eventToEdit._id
        }).subscribe((controlResponse) => {
            this.fromPage.ngOnInit();
        });
    }
};
EventListEditDialog = __decorate([
    core_1.Component({
        selector: 'event-list-edit-dialog',
        templateUrl: 'event-list.dialog-content.html',
    }),
    __param(1, core_1.Optional()), __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [dialog_1.MatDialogRef, Object, events_service_1.EventsService])
], EventListEditDialog);
exports.EventListEditDialog = EventListEditDialog;
let EventListCreateDialog = class EventListCreateDialog {
    constructor(dialogRef, data, eventService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.eventService = eventService;
        this.fromPage = data.fromPage;
        this.closingCallback = data.closingCallback;
        this.backUrl = environment_1.environment.baseUrl;
    }
    handleImage() {
        this.image = document.getElementById("createEventFileInput").files[0];
    }
    submit() {
        this.errorMessage = "";
        if (this.localisation == undefined || this.localisation == '') {
            this.errorMessage = "Lieu non spécifié";
        }
        else if (this.impact == undefined || this.impact == '') {
            this.errorMessage = "Impact non spécifié";
        }
        else if (this.dateDebut == undefined || this.dateDebut == '') {
            this.errorMessage = "Date de commencement non spécifiée";
        }
        else if (this.dateFin == undefined || this.dateFin == '') {
            this.errorMessage = "Date de fin non spécifiée";
        }
        else if (!happensBefore(this.dateDebut, this.dateFin)) {
            this.errorMessage = "La date de fin arrive avant la date de début.";
        }
        else {
            if (this.relevant == undefined) {
                this.relevant = false;
            }
            if (this.type == undefined) {
                this.type = "manual";
            }
            this.eventService.createEvent({
                localisation: this.localisation,
                relevant: this.relevant,
                dateDebut: `${this.dateDebut}T00:00:00.000Z`,
                dateFin: `${this.dateFin}T00:00:00.000Z`,
                impact: this.impact,
                info: this.info,
                source: this.source,
                type: this.type
            }).subscribe((controlResponse) => {
                this.closingCallback();
            });
        }
    }
};
EventListCreateDialog = __decorate([
    core_1.Component({
        selector: 'event-list-create-dialog',
        templateUrl: 'event-list.dialog-create.html',
    }),
    __param(1, core_1.Optional()), __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [dialog_1.MatDialogRef, Object, events_service_1.EventsService])
], EventListCreateDialog);
exports.EventListCreateDialog = EventListCreateDialog;
//# sourceMappingURL=event-list.component.js.map