import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Event } from '../event-list/event'
import { EventsService } from '../events.service'

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService : EventsService) { }

  currentEvent : Event;
  links;

  ngOnInit(): void {
    // this.eventService.getLinks(this.currentEvent.id).subscribe((response) => {
    //   this.links = response; 
    // })
  }

}
