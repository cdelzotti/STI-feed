import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'

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

    /** Get relevant events from server */
    getEvents() : Observable<Event[]> {
        let eventUrl : string = `${environment.baseUrl}output/event/`
        return this.http.get<Event[]>(eventUrl)
    }

    getLinks(eventID : string) {
      let url : string = `${environment.baseUrl}output/link/${eventID}`
      return this.http.get(url)
    }
}