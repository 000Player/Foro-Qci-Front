import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Skill } from '../models/skill';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Response<Skill[]>>(environment.URL + 'skill/');
  }

  getSkill(id: string) {
    return this.http.get<Response<Skill>>(environment.URL + 'skill/' + id);
  }

  createSkill(skill: Skill) {
    return this.http.post<Response<Skill>>(environment.URL + 'skill/', skill);
  }

  updateSkill(skill: Skill){
    return this.http.put<Response<Skill>>(environment.URL + 'skill/', skill);
  }

  addSkill(idSkill: string, idBranch: string){
    return this.http.put<Response<Skill>>(environment.URL + 'skill/' + idSkill + '/' + idBranch, null);
  }

  deleteSkill(idSkill: string, idBranch: string){
    return this.http.delete<Response<Skill>>(environment.URL + 'skill/' + idSkill + '/' + idBranch);
  }

}
