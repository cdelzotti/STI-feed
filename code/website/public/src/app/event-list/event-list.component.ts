import { Component, OnInit } from '@angular/core';
import { EventsService } from './../events.service'
import { Message } from './messages'
import { ControlResponse } from './controlResponse'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  constructor (
    private eventService : EventsService,
    private activateRoute : ActivatedRoute  
  ){}

  messages : Message[]
  controlResponse : ControlResponse

  /**
   * Get published messages
   */
  getMessages():void{
      this.eventService.getCurrentMessages().subscribe(messages => {
        this.messages = messages;
      });
  }

   /** 
   * Angular function called on component load 
   */
  ngOnInit(): void {
      this.getMessages();
  }

   /**
   * Transform an ugly date into a nice string
   * 
   * @param uglyDate a date formatted as a 'YYY-MM-DDTHH-MM-SS.SZ' string
   * @returns a nicely formatted date in plain text
   */
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