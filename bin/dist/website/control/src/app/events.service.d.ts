import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event-list/event';
import { ControlResponse } from './event-list/controlResponse';
import { Message } from './messages/message';
export declare class EventsService {
    private http;
    constructor(http: HttpClient);
    httpOpt: {
        headers: HttpHeaders;
    };
    refreshHeaders(): void;
    refreshEvents(): Observable<any>;
    getEvents(): Observable<Event[]>;
    getSpecificEvents(body: any): Observable<Event[]>;
    editEvent(body: Event): Observable<ControlResponse>;
    createEvent(body: Event): Observable<ControlResponse>;
    postMessage(body: any): Observable<ControlResponse>;
    getMessages(body: any): Observable<Message[]>;
    getIncomingMessage(): Observable<Message[]>;
    getOldMessage(): Observable<Message[]>;
    updateMesssage(body: any): Observable<ControlResponse>;
    deleteMessage(messageID: string): Observable<ControlResponse>;
    login(user: string, password: string): Observable<Object>;
    postFile(fileToUpload: File): Observable<Object>;
    checkAuth(): Observable<Object>;
    static beautifulDate(uglyDate: string): string;
}
