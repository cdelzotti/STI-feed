import { Component, OnInit } from '@angular/core';
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
}
