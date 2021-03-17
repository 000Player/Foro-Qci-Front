import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Response } from '../models/response';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: User[];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<Response<User[]>>(environment.URL + 'user');
  }

  getUser(email: string) {
    return this.http.get<Response<User>>(environment.URL + `user/${email}`);
  }

  lostPass(email: string) {
    return this.http.get<Response<any>>(environment.URL + `user/lostpass/${email}`);
  }

  getUserById(id: string) {
    return this.http.get<Response<User>>(environment.URL + `user/id/${id}`);
  }

  postUser(user: User) {
    return this.http.post<Response<User>>(environment.URL + 'user', user);
  }

  updateUser(user: User) {
    return this.http.put<Response<User>>(environment.URL + 'user', user);
  }

  updatePermission(pmsn: number, userId: string) {
    const req = {
      permission: pmsn,
      id: userId
    };
    return this.http.put<Response<User>>(environment.URL + 'user/permission/', req);
  }

  deleteUser(id: string) {
    return this.http.delete<Response<User>>(environment.URL + `user/${id}`);
  }

}
