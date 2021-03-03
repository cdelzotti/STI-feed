import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
export declare class TopBarComponent implements OnInit {
    private router;
    private route;
    constructor(router: Router, route: ActivatedRoute);
    loggedIn: boolean;
    ngOnInit(): void;
    logOut(): void;
}
