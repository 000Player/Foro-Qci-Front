import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public eventList: Event[] = new Array<Event>();

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(environment.URL + 'event');
  }

  getEventByIdUser(id: string): Observable<Response<Event>> {
    return this.http.get<Response<Event>>(environment.URL + 'event/user' + id);
  }

  getEventById(id: string): Observable<Response<Event>> {
    return this.http.get<Response<Event>>(environment.URL + 'event/' + id);
  }

  createEvent(event: Event): Observable<Response<Event>> {
    return this.http.post<Response<Event>>(environment.URL + 'event', event);
  }

  updateEvent(event: Event): Observable<Response<Event>> {
    return this.http.put<Response<Event>>(environment.URL + 'event', event);
  }

  closeEvent(id: string): Observable<Response<string>> {
    return this.http.delete<Response<string>>(environment.URL + 'event/' + id);
  }

}
