import { OnInit } from '@angular/core';
import { EventsService } from "../events.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event-list/event';
export declare class MessageEditionComponent implements OnInit {
    private eventService;
    private router;
    private route;
    constructor(eventService: EventsService, router: Router, route: ActivatedRoute);
    newMessage: boolean;
    id: string;
    relatedEvent: string;
    event: Event;
    dateDebut: string;
    dateFin: string;
    title: string;
    content: string;
    type: string;
    published: boolean;
    errorMessage: string;
    backUrl: string;
    fileLink: string;
    ngOnInit(): void;
    uploadFile(files: FileList): void;
    addMessage(): void;
}
