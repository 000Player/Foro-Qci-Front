import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Response<Tag[]>> {
    return this.http.get<Response<Tag[]>>(environment.URL + 'tag');
  }

  getTagByQuestionId(id: string): Observable<Response<Tag>> {
    return this.http.get<Response<Tag>>(environment.URL + 'tag/' + id);
  }

  createTag(tag: Tag): Observable<Response<Tag>> {
    return this.http.post<Response<Tag>>(environment.URL + 'tag', tag);
  }

  updateTag(tag: Tag): Observable<Response<Tag>> {
    return this.http.put<Response<Tag>>(environment.URL + 'tag', tag);
  }

  addTag(idTag: string, idBranch: string): Observable<Response<Tag>> {
    return this.http.put<Response<Tag>>(environment.URL + 'tag/' + idTag + '/' + idBranch, null);
  }

  removeTag(idTag: string, idBranch: string): Observable<Response<Tag>> {
    return this.http.delete<Response<Tag>>(environment.URL + 'tag/' + idTag + '/' + idBranch);
  }
}
