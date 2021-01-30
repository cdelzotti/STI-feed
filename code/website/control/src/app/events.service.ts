import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'
import { ControlResponse } from './event-list/controlResponse'
import { Message } from './messages/message'

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

    getSpecificEvents(body) {
      let eventUrl : string = `${environment.baseUrl}control/select-event/`;
      return this.http.post<Event[]>(eventUrl, body);
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

    postMessage(body) {
      // TODO assert body
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.post<ControlResponse>(url, body)
    }

    getMessages(body) {
      // TODO assert body
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body)
    }

    getIncomingMessage(){
      // TODO : Assert stuff
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["more", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body)
    }

    getOldMessage(){
      // TODO : Assert stuff
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["less", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body)
    }

    updateMesssage(body) {
      // TODO assert body
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.put<ControlResponse>(url, body)
    }

    deleteMessage(messageID : string){
      // TODO assert body
      let url : string = `${environment.baseUrl}control/msg/${messageID}`
      return this.http.delete<ControlResponse>(url)
    }
}