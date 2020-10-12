import { Component, OnInit } from '@angular/core';
import { EventsService } from './../events.service'
import { Event } from './event'

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  constructor (private eventService : EventsService ){}

  events : Event[]

  getEvents():void{
      this.eventService.getEvents().subscribe(events => (this.events = events));
  }

  ngOnInit(): void {
      this.getEvents()
  }

}