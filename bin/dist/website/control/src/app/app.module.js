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
const animations_1 = require("@angular/platform-browser/animations");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const icon_1 = require("@angular/material/icon");
const http_1 = require("@angular/common/http");
const dialog_1 = require("@angular/material/dialog");
const forms_2 = require("@angular/forms");
const router_1 = require("@angular/router");
const tinymce_angular_1 = require("@tinymce/tinymce-angular");
const app_component_1 = require("./app.component");
const top_bar_component_1 = require("./top-bar/top-bar.component");
const event_list_component_1 = require("./event-list/event-list.component");
const navigator_component_1 = require("./navigator/navigator.component");
const messages_component_1 = require("./messages/messages.component");
const routeur_routing_module_1 = require("./routeur/routeur-routing.module");
const message_edition_component_1 = require("./message-edition/message-edition.component");
const login_component_1 = require("./login/login.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            top_bar_component_1.TopBarComponent,
            event_list_component_1.EventListComponent,
            event_list_component_1.EventListEditDialog,
            event_list_component_1.EventListCreateDialog,
            navigator_component_1.NavigatorComponent,
            messages_component_1.MessagesComponent,
            message_edition_component_1.MessageEditionComponent,
            login_component_1.LoginComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            icon_1.MatIconModule,
            http_1.HttpClientModule,
            dialog_1.MatDialogModule,
            animations_1.BrowserAnimationsModule,
            animations_1.NoopAnimationsModule,
            forms_2.FormsModule,
            routeur_routing_module_1.RouteurRoutingModule,
            router_1.RouterModule,
            tinymce_angular_1.EditorModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map