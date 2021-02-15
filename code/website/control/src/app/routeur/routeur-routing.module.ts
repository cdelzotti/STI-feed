import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from '../event-list/event-list.component'
import { MessagesComponent } from '../messages/messages.component'
import { LoginComponent } from '../login/login.component'
import { MessageEditionComponent } from '../message-edition/message-edition.component'

const routes: Routes = [
  // Default page : Login page
  {
    path : "",
    component : LoginComponent
  },
  // Event page : where every event is listed
  {
    path : "events",
    component : EventListComponent,
  },
  // Messages page : Shows every messages
  // :type is either 'current' (displays upcomming messages) or
  // 'history' (displays past messages)
  {
    path : "messages/:type",
    component : MessagesComponent,
  },
  // Message edition, works both on history and current mode,
  // :type is just ignored. If :id is provided the page will be considered
  // as an message-edition page. If not it will be a message creation page. 
  {
    path : "messages/:type/message-edit/:id",
    component : MessageEditionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteurRoutingModule { }
