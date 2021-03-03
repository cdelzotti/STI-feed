import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './event-list/messages';
export declare class EventsService {
    private http;
    constructor(http: HttpClient);
    getCurrentMessages(): Observable<Message[]>;
    getMessageById(id: string): Observable<Message[]>;
    static beautifulDate(uglyDate: string): string;
}
