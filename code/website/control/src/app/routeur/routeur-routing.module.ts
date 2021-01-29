import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from '../event-list/event-list.component'
import { MessagesComponent } from '../messages/messages.component'
import { HistoryComponent } from '../history/history.component'
import { MessageEditionComponent } from '../message-edition/message-edition.component'

const routes: Routes = [
  {
    path : "",
    component : EventListComponent,
  },
  {
    path : "messages/:type",
    component : MessagesComponent,
  },
  {
    path : "messages/:type/message-edit/:id",
    component : MessageEditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteurRoutingModule { }
