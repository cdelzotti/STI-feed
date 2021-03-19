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
        this.getRelatedEventType();
      })
    } else {
      this.eventsServices.getOldMessage().subscribe((messages) => {
        this.messages = messages;
        this.getRelatedEventType();
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

  getRelatedEventType(){
    for (let index = 0; index < this.messages.length; index++) {
      this.messages[index].relatedType = "Chargement en cours";
      if (this.messages[index].relatedEvent == "" || this.messages[index].relatedEvent == undefined) {
        this.messages[index].relatedType = "Indépendant";
      } else {
        this.eventsServices.getSpecificEvents({
          _id : this.messages[index].relatedEvent
        }).subscribe(event => {
          if (event.length == 0) {
            this.messages[index].relatedType = "Évènement introuvable"
          } else {
            this.messages[index].relatedType = event[0].type;
          }
        });
      } 
    }
  }

  applyDateChanges(date : string){
    return EventsService.beautifulDate(date);
  }
}
