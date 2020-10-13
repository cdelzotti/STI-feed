import { Component, OnInit } from '@angular/core';
import { EventsService } from './../events.service'
import { Event } from './event'
import { ControlResponse } from './controlResponse'
import { response } from 'express';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  constructor (private eventService : EventsService ){}

  events : Event[]
  controlResponse : ControlResponse

  getEvents():void{
      this.eventService.getEvents().subscribe(events => (this.events = events));
  }

  ngOnInit(): void {
      this.getEvents()
  }

  beautifulDate(uglyDate : string) : string {
    let numberToMonth : string[] = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ]

    let date : string = uglyDate.split("T")[0]
    let dateComponents : string[] = date.split("-")
    return `${+dateComponents[2]} ${numberToMonth[+dateComponents[1] - 1]} ${dateComponents[0]}`
  }

}