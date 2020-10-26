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
     * Publish/Unpublish an event
     * 
     * @param eventId : an event identifier 
     * @param published : must the event be published or not ? 
     */
    publish(eventId : string, published : boolean ) : Observable<ControlResponse>{
      let eventUrl : string = `${environment.baseUrl}control/event/`
      let body = {
        _id : eventId,
        relevant : published
      }
      return this.http.put<ControlResponse>(eventUrl, body)
    }
}