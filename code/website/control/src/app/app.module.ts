import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogContent, MatDialogActions} from "@angular/material/dialog"
import { FormsModule } from '@angular/forms'
import { RouterModule } from "@angular/router"
import {EditorModule} from '@tinymce/tinymce-angular'

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component'
import { EventListComponent, EventListEditDialog, EventListCreateDialog } from './event-list/event-list.component';
import { NavigatorComponent } from './navigator/navigator.component'
import { MessagesComponent } from './messages/messages.component';
import { RouteurRoutingModule} from './routeur/routeur-routing.module';
import { MessageEditionComponent } from './message-edition/message-edition.component';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventListComponent,
    EventListEditDialog,
    EventListCreateDialog,
    NavigatorComponent,
    MessagesComponent,
    MessageEditionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    RouteurRoutingModule,
    RouterModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
