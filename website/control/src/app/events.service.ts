import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'

@Injectable({
  providedIn: 'root'
})
export class EventsService{
    eventUrl : string = `${environment.baseUrl}control/select-event/`

    constructor(private http: HttpClient){}

    /** Get events from server */
    getEvents() : Observable<Event[]> {
        let body = {
          dateFin : ["more", "2020-10-12T00:00:00.000Z"]
        }
        let strBody : string = JSON.stringify(body);
        let httpOpt = {
          headers : new HttpHeaders({
              'content-Type' : 'application/json',
              'Access-Control-Allow-Origin' : 'GET'
          }),
          observe : 'body' as const
      }
      return this.http.post<Event[]>(this.eventUrl, body)
    }
}