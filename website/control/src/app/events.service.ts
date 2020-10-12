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

    /** Get events from server */
    getEvents() : Observable<Event[]> {
        let eventUrl : string = `${environment.baseUrl}control/select-event/`
        let body = {
          dateFin : ["more", "2020-10-12T00:00:00.000Z"]
        }
      return this.http.post<Event[]>(eventUrl, body)
    }

    publish(eventId : number, published : boolean ) : Observable<ControlResponse>{
      let eventUrl : string = `${environment.baseUrl}control/event/`
      let body = {
        id : eventId,
        relevant : published
      }
      return this.http.put<ControlResponse>(eventUrl, body)
    }
}