import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBranches(): Observable<Response<Branch[]>> {
    return this.http.get<Response<Branch[]>>(environment.URL + 'branch');
  }

  getBranchById(id: string): Observable<Response<Branch>> {
    return this.http.get<Response<Branch>>(environment.URL + 'branch/' + id);
  }

  createBranch(branch: Branch): Observable<Response<Branch>> {
    return this.http.post<Response<Branch>>(environment.URL + 'branch', branch);
  }

  updateBranch(branch: Branch): Observable<Response<Branch>> {
    return this.http.put<Response<Branch>>(environment.URL + 'branch', branch);
  }

  deleteBranch(id: string): Observable<Response<Branch>> {
    return this.http.delete<Response<Branch>>(environment.URL + 'branch/' + id);
  }

}
