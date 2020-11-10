import { Component, OnInit, Optional, Inject } from '@angular/core';
import { EventsService } from './../events.service'
import { Event } from './event'
import { ControlResponse } from './controlResponse'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { link } from '@hapi/joi';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  constructor (private eventService : EventsService, public dialog: MatDialog){}

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
   * Publish/Unpublish an event
   * 
   * @param id : events identifier 
   * @param relevance : Must it be pubished or not ?
   */
  editPublishing(id : string, relevance : boolean) : void{
    // Retrieve event
    let selectedEvent : Event = this.eventRetreiver(id);
    // edit event
    this.eventService.editEvent({
      _id : id,
      relevant : !selectedEvent.relevant
    }).subscribe(
      (controlResponse) => {
        this.controlResponse = controlResponse;
        this.ngOnInit();
      }
    );
  }


  /**
   * Show a dialog box allowing event edition
   * 
   * @param id Event identifier
   */
  addMessage(id : string) : void {
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
        });
  }

  /** 
   * Angular function called on component load 
   */
  ngOnInit(): void {
      this.getEvents()
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
    this.links = [];
    this.eventService.getLinks(this.eventToEdit._id).subscribe((response)=>{
      this.links = response;
      let newThresold : number = this.links.length;
      let index : number = 0;
      while (index < 5) {
        if (index < newThresold) {
          this.links[index]["new"] = false;
        } else {
          this.links.push({
            name : "",
            link : "",
            new : true,
          });
        }
        index++;
      }
    });
  }

  handleImage(){
    this.image = (<HTMLInputElement>document.getElementById("editEventFileInput")).files[0]; 
  }

  handleLinkDelete(eventID){

    this.eventService.deleteLinks(eventID).subscribe((controlResponse)=>{
      for (let i = 0; i < this.links.length; i++) {
          if (this.links[i]._id == eventID){
            this.links[i]._id = undefined;
            this.links[i].name = "";
            this.links[i].link = ""
            this.links[i].new = true
          }
      }
    });
  }

  submit() {
    let linksToSend : Array<any> = this.checkLinks();
    this.eventService.editEvent({
      _id : this.eventToEdit._id,
      message : this.eventToEdit.message,
      relevant : true
    }).subscribe((controlResponse) => {
       // Upload image
       if (this.image != undefined){
        this.eventService.postImage(this.eventToEdit._id, this.image).subscribe((imgResponse) => {
          console.log(imgResponse);
          // Refresh the hosting component
          this.fromPage.ngOnInit()
        })
      }

      if (linksToSend.length > 0) {
        this.eventService.postLinks(this.eventToEdit._id, linksToSend).subscribe();
      }

      // Refresh the hosting component
      this.fromPage.ngOnInit()
    })
  }

  checkLinks() : Array<any>{
    let validNewLinks : Array<any> = [];
    for (let index = 0; index < this.links.length; index++) {
      if (this.links[index].name != "" && this.links[index].link != "" && this.links[index].new) {
        validNewLinks.push({
          name : this.links[index].name,
          link : this.links[index].link
        });
      }
    }
    return validNewLinks;
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
  links = [
    {
      name : "",
      link : ""
    },
    {
      name : "",
      link : ""
    },
    {
      name : "",
      link : ""
    },
  ]


  constructor(
    public dialogRef: MatDialogRef<EventListCreateDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private eventService : EventsService,
  ) {
    this.fromPage = data.fromPage;
    this.closingCallback = data.closingCallback;
  }

  handleImage(){
    this.image = (<HTMLInputElement>document.getElementById("createEventFileInput")).files[0]; 
  }

  submit(){
    // Check that minimal fields are filled
    // TODO assert dateFIn > Date debut
    if (!(this.localisation == undefined || this.impact == undefined || this.dateDebut == undefined || this.dateFin == undefined)) {
      // Assign default values
      if (this.relevant == undefined) {
        this.relevant = false;
      }
      if (this.type == undefined) {
        this.type = "manual"
      }
      // Retrieve usable links
      this.links = this.checkLinks();
      // Add new event
      this.eventService.createEvent({
        localisation : this.localisation,
        relevant : this.relevant,
        dateDebut : `${this.dateDebut}T00:00:00.000Z`,
        dateFin : `${this.dateFin}T00:00:00.000Z`,
        impact : this.impact,
        info : this.info,
        source : this.source,
        message : this.message,
        type : this.type
      }).subscribe(
        (controlResponse) => {
          // Upload image
          if (this.image != undefined){
            this.eventService.postImage(controlResponse._id, this.image).subscribe((imgResponse) => {
              console.log(imgResponse);
            })
          }

          // upload links
          if (this.links.length > 0) {
            this.eventService.postLinks(controlResponse._id, this.links).subscribe((linkResponse) =>{
              console.log(linkResponse);
            });
          }
          // reload event list
          this.closingCallback();
          this.fromPage.ngOnInit();
        }
      ); 
    }
  }

  checkLinks(){
    let returnLinks = [];
    for (const link in this.links) {
      if ((this.links[link].name != "" && this.links[link].link != "")) {
       returnLinks.push(this.links[link]);  
      }
    }
    return returnLinks;
  }
}