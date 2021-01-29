import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular'
import { response } from 'express';
import { EventsService } from "../events.service"
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../event-list/event'


@Component({
  selector: 'app-message-edition',
  templateUrl: './message-edition.component.html',
  styleUrls: ['./message-edition.component.css']
})
export class MessageEditionComponent implements OnInit {

  constructor(
    private eventService : EventsService,
    private router: Router, 
    private route: ActivatedRoute
  ) {
    // Checks if this is an edition or a creation
    this.route.params.subscribe(param => {
      // If it's an edition
      if (param.id != "new") {
        this.newMessage = false;
        // Get message infos
        this.eventService.getMessages({
          _id : param.id
        }).subscribe(message =>{
          this.id = param.id;
          this.relatedEvent = message[0].relatedEvent;
          if (message[0].dateDebut != undefined) {
            this.dateDebut = message[0].dateDebut.split("T")[0];            
          } else {
            this.dateDebut = undefined;
          }
          if (message[0].dateFin != undefined) {
            this.dateFin = message[0].dateFin.split("T")[0];            
          } else {
            this.dateFin = undefined;
          }
          this.published = message[0].published;
          this.title = message[0].title;
          this.type = message[0].type;
          this.content = message[0].content;
          // Retrieve related event infos
          if (this.relatedEvent != undefined) {
            this.eventService.getSpecificEvents({
              _id : this.relatedEvent
            }).subscribe(relatedEvent => {
              this.event = relatedEvent[0];
            })
          }
        });
      // If this is a creation
      } else {
        this.newMessage = true;
      }
    })
  }

  newMessage : boolean;
  id : string;
  relatedEvent : string;
  event : Event;
  dateDebut : string;
  dateFin : string;
  title : string;
  content : string;
  type : string;
  published : boolean;
  errorMessage : string;

  ngOnInit(): void {
    this.published = true;
  }

  addMessage() : void{
    // Empty the error warning
    this.errorMessage = ""
    // Handle errors
    if (this.dateDebut == undefined) {
      this.errorMessage = "Date de commencement non spécifiée"
    } else if (this.dateFin == undefined) {
      this.errorMessage = "Date de fin non spécifiée"
    } else if (this.title == undefined) {
      this.errorMessage = "Titre non spécifié"
    } else if (this.content == undefined) {
      this.errorMessage = "Aucun contenu n'est spécifié"
    } else {
      // Handle message posting
      // Set default type if necessary
      if (this.type == undefined) {
        this.type = "Annonce"
      }
      // Define return page
      let returnPage : string;
      let dateGiven : string[] = this.dateFin.split("-");
      let currentDate : Date = new Date();
      // If it's a new message, post it
      if (this.newMessage) {
        this.eventService.postMessage({
          dateDebut : `${this.dateDebut}T00:00:00.000Z`,
          dateFin : `${this.dateFin}T00:00:00.000Z`,
          title : this.title,
          content : this.content,
          published : this.published,
          type : this.type
        }).subscribe((response) => {
          if (response.error) {
            this.errorMessage = response.status;
          } else {
            this.router.navigateByUrl("/messages/current");
          }
        })
    } else {
        this.eventService.updateMesssage({
          _id : this.id,
          relatedEvent : this.relatedEvent,
          dateDebut : `${this.dateDebut}T00:00:00.000Z`,
          dateFin : `${this.dateFin}T00:00:00.000Z`,
          title : this.title,
          content : this.content,
          published : this.published,
          type : this.type
        }).subscribe( response => {
          if (response.error) {
            this.errorMessage = response.status;
          } else {
            this.router.navigateByUrl("/messages/current");
          }
        });
    }
  }
  }


  /**
   * returns true if date1 > date 2
   * 
   * @param date1 [month, day, year]
   * @param date2 [month, day, year]
   */
  compDate(date1 : [number, number, number], date2 :[number, number, number]) : boolean{
    if (date2[2] > date1[2]) {
      return false;
    } else if (date2[0] > date1[0]) {
      return false;
    } else if (date2[1] > date1[1]) {
      return false;
    }
    return false;
  }
}
