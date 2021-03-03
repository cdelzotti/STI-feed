import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
export declare class NavigatorComponent implements OnInit {
    private router;
    private route;
    private eventService;
    navClasses: any;
    constructor(router: Router, route: ActivatedRoute, eventService: EventsService);
    ngOnInit(): void;
    cleanNavClasses(): void;
}
