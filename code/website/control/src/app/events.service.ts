import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'
import { ControlResponse } from './event-list/controlResponse'

let httpOpt = {
  headers : new HttpHeaders({
      'content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : 'GET'
  }),
  observe : 'body' as const
}

@Injectable({
  providedIn: 'root'
})
export class EventsService{
    constructor(private http: HttpClient){}

    /** 
    * Get current / incomming events from server 
    * */
    getEvents() : Observable<Event[]> {
        let eventUrl : string = `${environment.baseUrl}control/select-event/`
        let hourLessDay : Date = new Date()
        hourLessDay.setHours(0,0,0,0)
        let body = {
          dateFin : ["more", hourLessDay.toISOString()]
        }
      return this.http.post<Event[]>(eventUrl, body)
    }

    /**
     * Edit an event
     * 
     * @param body : What the body should look like after update. DO NOT forgot to give the "_id" field ! 
     */
    editEvent(body : Event ) : Observable<ControlResponse>{
      // TODO : assert on body
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.put<ControlResponse>(eventUrl, body)
    }

    /**
     * Add an event to the DB
     * 
     * @param body The body off the event you want to add
     */
    createEvent(body : Event) : Observable<ControlResponse>{
      // TODO : assert no ID
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.post<ControlResponse>(eventUrl, body)
    }

    postImage(id : string, image){
      // TODO assert image
      let url : string = `${environment.baseUrl}control/picture/${id}`
      let formData = new FormData();
      formData.append("file", image, image.name)
      return this.http.post<ControlResponse>(url, formData);
    }

    postLinks(eventID : string, links) {
      // TODO assert links
      let url : string = `${environment.baseUrl}control/link/${eventID}`
      return this.http.post<ControlResponse>(url, links)
    }

    getLinks(eventID : string) {
      let url : string = `${environment.baseUrl}control/link/${eventID}`
      return this.http.get<ControlResponse>(url)
    }

    deleteLinks(eventID : string){
      let url : string = `${environment.baseUrl}control/link/${eventID}`
      return this.http.delete<ControlResponse>(url)
    }
}