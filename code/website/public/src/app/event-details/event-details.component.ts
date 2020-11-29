import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Event } from '../event-list/event'
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

  events : Event[];
  formattedMessage : string[];
  currentEventIndex : Number;
  backUrl : string = environment.baseUrl;
  init : boolean;

  ngOnInit(): void {
    this.init = false;
    let id : string;
    // Retrieve ID
    this.route.params.subscribe(param => {
      id = param["id"]
      // Retrieve events
      this.eventService.getEvents().subscribe(response => {
        this.events = response
        // Localize selected event
        let index = 0;
        let leaveLoop = false;
        while (index < this.events.length && !leaveLoop) {
          if (this.events[index]._id == id ) {
            this.currentEventIndex = index;
            leaveLoop = true;
          } else {
            index++;
          }
        }
        this.format();
      })
    })
  }

  format() : void {
    this.formattedMessage = [];
    // split text into paragraphs
    let paragraphs : string[] = this.events[this.currentEventIndex.toString()].message.split("\n");
    for (let index = 0; index < paragraphs.length; index++) {
      if (paragraphs[index] != "") {
        this.formattedMessage.push(paragraphs[index])
      }
      
    }
  }

}
