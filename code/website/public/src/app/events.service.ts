import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Message } from './event-list/messages'


@Injectable({
  providedIn: 'root'
})
export class EventsService{
    constructor(private http: HttpClient){}

    /** Get relevant events from server */
    getCurrentMessages() : Observable<Message[]> {
      let eventUrl : string = `${environment.baseUrl}output/msg/`;
      let today : Date = new Date();
      let formattedString : string[] = [];
      // format day
      if (today.getDate() < 10) {
        formattedString.push(`0${today.getDate()}`)
      } else {
        formattedString.push(`${today.getDate()}`)
      }
      // Format month
      if (today.getMonth() < 10) {
        formattedString.push(`0${today.getMonth() + 1}`)
      } else {
        formattedString.push(`${today.getMonth() + 1}`)
      }
      return this.http.post<Message[]>(eventUrl, {
          dateDebut : [
            "less", `${today.getFullYear()}-${formattedString[1]}-${formattedString[0]}T00:00:00.000Z`
          ],
          dateFin : [
            "more", `${today.getFullYear()}-${formattedString[1]}-${formattedString[0]}T00:00:00.000Z`
          ]
      });
    }

    getMessageById(id : string): Observable<Message[]>{
      let eventUrl : string = `${environment.baseUrl}output/msg/`;
      return this.http.post<Message[]>(eventUrl, {
          _id : id
      });
    }
}