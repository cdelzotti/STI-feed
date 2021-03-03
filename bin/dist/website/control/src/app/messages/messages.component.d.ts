import { OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Message } from './message';
import { Router, ActivatedRoute } from '@angular/router';
export declare class MessagesComponent implements OnInit {
    private eventsServices;
    private router;
    private route;
    constructor(eventsServices: EventsService, router: Router, route: ActivatedRoute);
    messages: Message[];
    ngOnInit(): void;
    getMessages(typeRequired: string): void;
    publish(id: string, publishState: boolean): void;
    delete(id: string): void;
    getRelatedEventType(): void;
    applyDateChanges(date: string): string;
}
