import { OnInit } from '@angular/core';
import { EventsService } from './../events.service';
import { Event } from './event';
import { ControlResponse } from './controlResponse';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
export declare function happensBefore(date1: string, date2: string): boolean;
export declare class EventListComponent implements OnInit {
    private eventService;
    dialog: MatDialog;
    private router;
    private route;
    constructor(eventService: EventsService, dialog: MatDialog, router: Router, route: ActivatedRoute);
    events: Event[];
    controlResponse: ControlResponse;
    refreshMessage: string;
    eventRetreiver: (eventID: string) => Event;
    getEvents(): void;
    refreshEvents(): Promise<void>;
    edit(id: string): void;
    addEvent(): void;
    addMessage(id: string): void;
    ngOnInit(): void;
    applyDateChanges(date: string): string;
}
export declare class EventListEditDialog {
    dialogRef: MatDialogRef<EventListEditDialog>;
    data: any;
    private eventService;
    eventToEdit: Event;
    fromPage: EventListComponent;
    backUrl: string;
    image: any;
    links: any;
    constructor(dialogRef: MatDialogRef<EventListEditDialog>, data: any, eventService: EventsService);
    submit(): void;
}
export declare class EventListCreateDialog {
    dialogRef: MatDialogRef<EventListCreateDialog>;
    data: any;
    private eventService;
    fromPage: EventListComponent;
    closingCallback: any;
    localisation: string;
    impact: string;
    info: string;
    dateDebut: string;
    dateFin: string;
    source: string;
    relevant: boolean;
    message: string;
    type: string;
    image: any;
    errorMessage: string;
    backUrl: string;
    constructor(dialogRef: MatDialogRef<EventListCreateDialog>, data: any, eventService: EventsService);
    handleImage(): void;
    submit(): void;
}
