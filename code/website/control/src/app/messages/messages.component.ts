import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { EventsService } from '../events.service'
import { Message } from './message'

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private eventsServices : EventsService) {}

  messages : Message[];

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages():void {
    this.eventsServices.getMessages({}).subscribe((messages) => {
      this.messages = messages;
    })
  }

  publish(id : string, publishState : boolean) : void{
    // Update message
    this.eventsServices.updateMesssage({
      _id : id,
      published : publishState
    }).subscribe(
      (response) =>{
        // Reload page
        this.ngOnInit();
      }
    )
  }

  delete(id:string) : void{
    this.eventsServices.deleteMessage(id).subscribe((response) => {
      this.ngOnInit();
    })
  }
}
