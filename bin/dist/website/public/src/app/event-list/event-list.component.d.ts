import { OnInit } from '@angular/core';
import { EventsService } from './../events.service';
import { Message } from './messages';
import { ControlResponse } from './controlResponse';
import { ActivatedRoute } from '@angular/router';
export declare class EventListComponent implements OnInit {
    private eventService;
    private activateRoute;
    constructor(eventService: EventsService, activateRoute: ActivatedRoute);
    messages: Message[];
    controlResponse: ControlResponse;
    getMessages(): void;
    ngOnInit(): void;
    applyBeautifulDate(date: string): string;
}
