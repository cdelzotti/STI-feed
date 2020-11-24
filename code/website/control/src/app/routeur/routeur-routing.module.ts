import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from '../event-list/event-list.component'
import { MessagesComponent } from '../messages/messages.component'
import { HistoryComponent } from '../history/history.component'

const routes: Routes = [
  {
    path : "",
    component : EventListComponent,
  },
  {
    path : "messages",
    component : MessagesComponent,
  },
  {
    path: "history",
    component : HistoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteurRoutingModule { }
