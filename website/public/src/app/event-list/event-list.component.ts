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


  applyBeautifulDate(date : string) : string {
    return EventsService.beautifulDate(date);
  }
}