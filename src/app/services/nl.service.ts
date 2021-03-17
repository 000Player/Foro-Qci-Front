import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Label } from '../models/label';
import { Question } from '../models/question';
import { Tag } from '../models/tag';



@Injectable({
  providedIn: 'root'
})
export class NlService {

  constructor(private http: HttpClient) { }

  getClassify(quetion: Question): Observable<Response<Label[]>> {
    return this.http.post<Response<Label[]>>(environment.URL + 'nl/classify', quetion);
  }

  getQuestions(ref: string): Observable<Response<Tag[]>> {
    return this.http.get<Response<Tag[]>>(environment.URL + 'nl/questions/' + ref);
  }

  addNewWords(ws: string, brchs: Array<string>): Observable<Response<string>> {
    const obj = {
      branches: brchs,
      words: ws
    };
    
    return this.http.post<Response<string>>(environment.URL + 'nl/addWords', obj);
  }

}
