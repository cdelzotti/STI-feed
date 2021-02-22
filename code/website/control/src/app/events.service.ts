import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'
import { ControlResponse } from './event-list/controlResponse'
import { Message } from './messages/message'
import * as assert from 'assert'

// let httpOpt = {
//   headers : new HttpHeaders({
//       'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class EventsService{
    constructor(private http: HttpClient){
      this.refreshHeaders();
    }

    httpOpt = {
      headers : new HttpHeaders({
          'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
      })
    }

    refreshHeaders(){
      this.httpOpt = {
        headers : new HttpHeaders({
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        })
      } 
    }
    

    refreshEvents() : Observable<any> {
      let eventUrl : string = `${environment.baseUrl}data/update-ap/`
      return this.http.post<Event[]>(eventUrl, {
        await : true
      }, this.httpOpt);
    }

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
      return this.http.post<Event[]>(eventUrl, body, this.httpOpt);
    }

    getSpecificEvents(body) {
      let eventUrl : string = `${environment.baseUrl}control/select-event/`;
      return this.http.post<Event[]>(eventUrl, body, this.httpOpt);
    }

    /**
     * Edit an event
     * 
     * @param body : What the body should look like after update. DO NOT forgot to give the "_id" field ! 
     */
    editEvent(body : Event ) : Observable<ControlResponse>{
      // An edition body should provide _id field
      assert(body._id != undefined)
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.put<ControlResponse>(eventUrl, body, this.httpOpt)
    }

    /**
     * Add an event to the DB
     * 
     * @param body The body off the event you want to add
     */
    createEvent(body : Event) : Observable<ControlResponse>{
      // An creation body should not provide _id field
      assert(body._id == undefined)
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.post<ControlResponse>(eventUrl, body, this.httpOpt)
    }

    postMessage(body) {
      // An creation body should not provide _id field
      assert(body._id == undefined)
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.post<ControlResponse>(url, body, this.httpOpt)
    }

    getMessages(body) {
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    getIncomingMessage(){
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["more", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    getOldMessage(){
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["less", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    updateMesssage(body) {
      // An edition body should provide _id field
      assert(body._id != undefined)
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.put<ControlResponse>(url, body, this.httpOpt)
    }

    deleteMessage(messageID : string){
      assert(messageID != "");
      let url : string = `${environment.baseUrl}control/msg/${messageID}`
      return this.http.delete<ControlResponse>(url,this.httpOpt)
    }

    login(user : string, password : string){
      assert(user != "" && password != "");
      let url : string = `${environment.baseUrl}user/auth/`
      return this.http.post(url, {
        username : user,
        password : password
      },this.httpOpt)
    }

    postFile(fileToUpload: File){
      assert(fileToUpload != undefined);
      let url : string = `${environment.baseUrl}cloud/`
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post(url, formData, this.httpOpt);
  }

    checkAuth(){
      let url : string = `${environment.baseUrl}user/checkauth/`
      return this.http.get(url, this.httpOpt);
    }

      /**
   * Transform an ugly date into a nice string
   * 
   * @param uglyDate a date formatted as a 'YYY-MM-DDTHH-MM-SS.SZ' string
   * @returns a nicely formatted date in plain text
   */
  static beautifulDate(uglyDate : string) : string {
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