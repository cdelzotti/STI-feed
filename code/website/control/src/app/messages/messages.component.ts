import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { EventsService } from '../events.service'
import { Message } from './message'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private eventsServices : EventsService,
    private router: Router, 
    private route: ActivatedRoute) {
      
    }

  messages : Message[];

  ngOnInit(): void {
    this.route.params.subscribe(param => {
        this.getMessages(param.type);
    });
  }

  getMessages(typeRequired : string):void {
    this.messages = [];
    if (typeRequired == "current") {
      this.eventsServices.getIncomingMessage().subscribe((messages) => {
        this.messages = messages;
      })
    } else {
      this.eventsServices.getOldMessage().subscribe((messages) => {
        this.messages = messages;
      })
    }
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
