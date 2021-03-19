import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Event } from './event-list/event'
import { ControlResponse } from './event-list/controlResponse'
import { Message } from './messages/message'
import * as assert from 'assert'
import { promise } from 'selenium-webdriver';

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

    /**
     * Reload EventsService's httpOpt object with what is currently il local
     * storage under the 'jwt' key. Typically used after login/logout.
     */
    refreshHeaders() : void{
      this.httpOpt = {
        headers : new HttpHeaders({
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        })
      } 
    }
    

    /**
     * Refresh event on server side, that means forcing the server to reparse events
     * from the external database. No direct impact on client side, must re-call `getEvents()`
     * afterwards to see any changes.
     */
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

    /**
     * Returns events mathing body description
     * 
     * @param body defines constraints for event selection. 
     */
    getSpecificEvents(body) : Observable<Event[]> {
      // No assert possible on body as it defines constraints for the
      // current query, so an empty body just means no constraints and
      // an invalid body will just return an empty query. Nothing but determined
      // behavior.

      let eventUrl : string = `${environment.baseUrl}control/select-event/`;
      return this.http.post<Event[]>(eventUrl, body, this.httpOpt);
    }

    /**
     * Edit an event
     * 
     * @param body : What the body should look like after update.
     * @requires body._id != undefined 
     */
    editEvent(body : Event ) : Observable<ControlResponse>{
      // An edition body should provide _id field
      assert(body._id != undefined, "Event edition must provide identifier");
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.put<ControlResponse>(eventUrl, body, this.httpOpt)
    }

    /**
     * Add an event to the DB
     * 
     * @param body The body of the event you want to add.
     * @requires body._id == undefined
     */
    createEvent(body : Event) : Observable<ControlResponse>{
      // An creation body should not provide _id field
      assert(body._id == undefined, "Event creation cannot provide identifier");
      let eventUrl : string = `${environment.baseUrl}control/event/`
      return this.http.post<ControlResponse>(eventUrl, body, this.httpOpt)
    }

    /**
     * Add a message in DB
     * 
     * @param body message body
     * @requires body._id == undefined
     */
    postMessage(body) : Observable<ControlResponse>{
      // An creation body should not provide _id field
      assert(body._id == undefined, "Message creation cannot provide identifier")
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.post<ControlResponse>(url, body, this.httpOpt)
    }

    /**
     * Returns messages matching `body`
     * 
     * @param body query constraints
     */
    getMessages(body) : Observable<Message[]> {
      // No assert possible on body as it defines constraints for the
      // current query, so an empty body just means no constraints and
      // an invalid body will just return an empty query. Nothing but determined
      // behavior.
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    /**
     * Returns current and future Messages.
     */
    getIncomingMessage() : Observable<Message[]>{
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["more", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    /**
     * Returns out of date messages.
     */
    getOldMessage() : Observable<Message[]>{
      let hourLessDay : Date = new Date()
      hourLessDay.setHours(0,0,0,0)
      let body = {
        dateFin : ["less", hourLessDay.toISOString()]
      }
      let url : string = `${environment.baseUrl}control/getMsg/`
      return this.http.post<Message[]>(url, body, this.httpOpt)
    }

    /**
     * update a message
     * 
     * @param body : content of the message to be edited
     * @requires body._id != undefined
     */
    updateMesssage(body) {
      // An edition body should provide _id field
      assert(body._id != undefined, "Message edition must provide identifier");
      let url : string = `${environment.baseUrl}control/msg/`
      return this.http.put<ControlResponse>(url, body, this.httpOpt)
    }

    /**
     * Delete a message
     * 
     * @param messageID : Message identifier
     * @requires messageID != "" 
     */
    deleteMessage(messageID : string){
      assert(messageID != "", "Message deletion must provide identifier");
      let url : string = `${environment.baseUrl}control/msg/${messageID}`
      return this.http.delete<ControlResponse>(url,this.httpOpt)
    }

    /**
     * Login a user
     * 
     * @param user 
     * @param password
     * @requires user != "" 
     * @requires password != "" 
     */
    login(user : string, password : string){
      assert(user != "" && password != "", "Login must provide creditentials");
      let url : string = `${environment.baseUrl}user/auth/`
      return this.http.post(url, {
        username : user,
        password : password
      },this.httpOpt)
    }

    /**
     * Upload a file to the server
     * 
     * @param fileToUpload : File that must be uploaded
     * @requires fileToUpload != undefined
     */
    postFile(fileToUpload: File){
      assert(fileToUpload != undefined, "fileToUpload must be specified");
      let url : string = `${environment.baseUrl}cloud/`
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post(url, formData, this.httpOpt);
  }

    /**
     * Check if the user is still logged in. Request successfully respond if
     * the user JWT is still valid, and failed otherwise.
     * 
     */
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
    assert(uglyDate != "", "Cannot parse an empty string");

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