import { Component, OnInit, Optional, Inject } from '@angular/core';
import { EventsService } from './../events.service'
import { Event } from './event'
import { ControlResponse } from './controlResponse'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  constructor (
    private eventService : EventsService, 
    public dialog: MatDialog,
    private router: Router, 
    private route: ActivatedRoute){
    }

  events : Event[]
  controlResponse : ControlResponse

  // Lambda function to retreive an event from its id
  eventRetreiver = (eventID : string) : Event => {
    let returnEvent : Event;
    this.events.forEach((event : Event, index : number, array : Event[])=>{
      if (event._id == eventID) {
        returnEvent = event;
      }
    });
    return returnEvent;
  }

  /**
   *  Store into `events` every current/incoming events 
   */
  getEvents():void{
      this.eventService.getEvents().subscribe(events => (this.events = events));
  }

  /**
   * Show a dialog box allowing event edition
   * 
   * @param id Event identifier
   */
  edit(id : string) : void {
    // retrieve event details
    let event : Event = this.eventRetreiver(id);

    // Open dialog box
    const dialogRef = this.dialog.open(EventListEditDialog, {
      data : {
        eventEdit : event,
        fromPage : this
      }
    });

    // Closing callback
    dialogRef.afterClosed().subscribe();
    
  }


  addEvent() : void {
        // Open dialog box
        const dialogRef = this.dialog.open(EventListCreateDialog, {
          data : {
            fromPage : this,
            closingCallback : () => {
              dialogRef.close()
            }
          }
        });

        // Closing callback
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          this.ngOnInit();
        });
  }

  addMessage(id : string): void {
    // Create an empty event
    this.eventService.postMessage({
      relatedEvent : id
    }).subscribe(response => {
      this.router.navigate([`/messages/current/message-edit/${response._id}`], {relativeTo: this.route, skipLocationChange: true});
    });
  }

  /** 
   * Angular function called on component load 
   */
  ngOnInit(): void {
      this.getEvents()
  }

  applyDateChanges(date : string){
    return EventsService.beautifulDate(date);
  }
}


// The dialogBox edition content
@Component({
  selector: 'event-list-edit-dialog',
  templateUrl: 'event-list.dialog-content.html',
})
export class EventListEditDialog {

  eventToEdit : Event;
  fromPage : EventListComponent;
  backUrl : string;
  image;
  links;

  constructor(
    public dialogRef: MatDialogRef<EventListEditDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private eventService : EventsService
  ) {
    this.eventToEdit = data.eventEdit;
    this.fromPage = data.fromPage;
    this.backUrl = environment.baseUrl;
  }

  handleImage(){
    this.image = (<HTMLInputElement>document.getElementById("editEventFileInput")).files[0]; 
  }

  submit() {
    this.eventService.editEvent({
      _id : this.eventToEdit._id
    }).subscribe((controlResponse) => {
      // Refresh the hosting component
      this.fromPage.ngOnInit()
    })
  }
}


// The dialogBox creation content
@Component({
  selector: 'event-list-create-dialog',
  templateUrl: 'event-list.dialog-create.html',
})
export class EventListCreateDialog{
  
  // Component that generated the dialogBox
  fromPage : EventListComponent;
  // A callback to close the dialog
  closingCallback; 

  // Event variables
  localisation : string;
  impact : string;
  info : string;
  dateDebut : string;
  dateFin : string;
  source : string;
  relevant : boolean;
  message : string;
  type : string;
  image;
  errorMessage : string;
  backUrl : string;


  constructor(
    public dialogRef: MatDialogRef<EventListCreateDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private eventService : EventsService,
  ) {
    this.fromPage = data.fromPage;
    this.closingCallback = data.closingCallback;
    this.backUrl = environment.baseUrl;
  }

  handleImage(){
    this.image = (<HTMLInputElement>document.getElementById("createEventFileInput")).files[0]; 
  }

  submit(){
    // Check that minimal fields are filled
    // TODO assert dateFIn > Date debut
    this.errorMessage = "";
    if (this.localisation == undefined || this.localisation == '') {
      this.errorMessage = "Lieu non spécifié";
    } else if (this.impact == undefined || this.impact == '') {
      this.errorMessage = "Impact non spécifié";
    } else if (this.dateDebut == undefined || this.dateDebut == '') {
      this.errorMessage = "Date de commencement non spécifiée";
    } else if (this.dateFin == undefined || this.dateFin == '') {
      this.errorMessage = "Date de fin non spécifiée";
    } else {
      // Assign default values
      if (this.relevant == undefined) {
        this.relevant = false;
      }
      if (this.type == undefined) {
        this.type = "manual"
      }
      // Add new event
      this.eventService.createEvent({
        localisation : this.localisation,
        relevant : this.relevant,
        dateDebut : `${this.dateDebut}T00:00:00.000Z`,
        dateFin : `${this.dateFin}T00:00:00.000Z`,
        impact : this.impact,
        info : this.info,
        source : this.source,
        type : this.type
      }).subscribe(
        (controlResponse) => {
          // reload event list
          this.closingCallback();
        }
      ); 
    }
  }

}