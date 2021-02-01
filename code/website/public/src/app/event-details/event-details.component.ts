import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Message } from '../event-list/messages'
import { EventsService } from '../events.service'
import { ActivatedRoute } from "@angular/router"
import { resolve } from 'dns';
import { environment} from '../../environments/environment'

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(
    private eventService : EventsService,
    private route : ActivatedRoute
    ) { }

  message : Message;

  ngOnInit(): void {
    let id : string;
    // Retrieve ID
    this.route.params.subscribe(param => {
      id = param["id"]
      // Retrieve events
      this.eventService.getMessageById(id).subscribe(message => {
        this.message = message.shift();
      })
    })
  }

}
