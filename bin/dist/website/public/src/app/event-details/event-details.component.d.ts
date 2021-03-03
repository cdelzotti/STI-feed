import { OnInit } from '@angular/core';
import { Message } from '../event-list/messages';
import { EventsService } from '../events.service';
import { ActivatedRoute } from "@angular/router";
export declare class EventDetailsComponent implements OnInit {
    private eventService;
    private route;
    constructor(eventService: EventsService, route: ActivatedRoute);
    message: Message;
    ngOnInit(): void;
    applyBeautifulDate(date: string): string;
}
