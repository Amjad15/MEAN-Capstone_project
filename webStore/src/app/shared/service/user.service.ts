import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedProduct : User;
  products : User[];
  readonly baseURL = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient ) { }

  login(obj: any) {
    return this.http.post(this.baseURL+ `/login`, obj);
  }
  getAllUsers() {
    return this.http.get(this.baseURL+ `/users`);
  }

  register(obj: any) {
    return this.http.post(this.baseURL+ `/register`, obj);
  }
  addUser(obj: any) {
    return this.http.post(this.baseURL+ `/addUser`, obj);
  }

  editUserInfo(obj: any , id: any) {
    return this.http.put(this.baseURL + `/editUser`+ `/${id}`, obj);
  }

  deActivateUser(_id: string) {
    const obj = {active:0};
    return this.http.put(this.baseURL + `/${_id}` , obj);
  }
}
