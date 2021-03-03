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
exports.NavigatorComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const events_service_1 = require("../events.service");
let NavigatorComponent = class NavigatorComponent {
    constructor(router, route, eventService) {
        this.router = router;
        this.route = route;
        this.eventService = eventService;
        this.router.events.subscribe(event => {
            if (event instanceof router_1.NavigationEnd) {
                this.cleanNavClasses();
                let currentRoute = event["url"].split("/");
                let activePage;
                if (currentRoute.length > 2) {
                    activePage = currentRoute[2];
                }
                else {
                    activePage = currentRoute[1];
                }
                document.getElementById("navBar").style.display = '';
                if (activePage == "events") {
                    this.navClasses[0].class = "nav_selection";
                }
                else if (activePage == "current") {
                    this.navClasses[1].class = "nav_selection";
                }
                else if (activePage == "history") {
                    this.navClasses[2].class = "nav_selection";
                }
                else {
                    document.getElementById("navBar").style.display = 'none';
                }
                if (activePage != "") {
                    this.eventService.checkAuth().subscribe(response => { }, error => this.router.navigateByUrl(""));
                }
            }
        });
    }
    ngOnInit() {
        this.cleanNavClasses();
    }
    cleanNavClasses() {
        this.navClasses = [
            {
                name: "events",
                class: ""
            },
            {
                name: "messages",
                class: ""
            },
            {
                name: "history",
                class: ""
            }
        ];
    }
};
NavigatorComponent = __decorate([
    core_1.Component({
        selector: 'app-navigator',
        templateUrl: './navigator.component.html',
        styleUrls: ['./navigator.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        events_service_1.EventsService])
], NavigatorComponent);
exports.NavigatorComponent = NavigatorComponent;
//# sourceMappingURL=navigator.component.js.map