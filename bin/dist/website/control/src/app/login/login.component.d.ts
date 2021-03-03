import { OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router, ActivatedRoute } from '@angular/router';
export declare class LoginComponent implements OnInit {
    private eventsService;
    private router;
    private route;
    password: string;
    username: string;
    errorMessage: string;
    constructor(eventsService: EventsService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    login(): void;
}
