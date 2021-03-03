"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const icon_1 = require("@angular/material/icon");
const http_1 = require("@angular/common/http");
const app_component_1 = require("./app.component");
const router_1 = require("@angular/router");
const top_bar_component_1 = require("./top-bar/top-bar.component");
const event_list_component_1 = require("./event-list/event-list.component");
const event_details_component_1 = require("./event-details/event-details.component");
const app_routing_module_1 = require("./routing/app-routing.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            top_bar_component_1.TopBarComponent,
            event_list_component_1.EventListComponent,
            event_details_component_1.EventDetailsComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            icon_1.MatIconModule,
            http_1.HttpClientModule,
            app_routing_module_1.AppRoutingModule,
            router_1.RouterModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map