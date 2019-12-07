import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../Models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  signUp(user: UserModel) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  logIn(user: {username: string, password: string}): Observable<{token: string, user: UserModel}> {
    return this.http.post<{token: string, user: UserModel}>(`${this.baseUrl}/users/logIn`, user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`);
  }

  isLogedInUser(): boolean {
    const token = localStorage.getItem('miboke-token');
    if (!token) {
      return false;
    }
    const user = JSON.parse(window.atob(token.split('.')[1]));
    return new Date(user.exp * 1000) > new Date();
  }

  isLoggedInAdmin(): boolean {
    const token = localStorage.getItem('miboke-token');
    if (!token) {
      return false;
    }
    const user = JSON.parse(window.atob(token.split('.')[1]));
    if (new Date(user.exp * 1000) > new Date() && user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  deleteUser(id: string): Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(`${this.baseUrl}/users/change`, {
      params: new HttpParams().set('id', id)
    });
  }

  verifyUser(id: string): Observable<UserModel[]> {
    return this.http.patch<UserModel[]>(`${this.baseUrl}/users/change`, {id});
  }

  changePass(pass: string, id: string): Observable<HttpResponse<UserModel>> {
    return this.http.patch<UserModel>(`${this.baseUrl}/users/passChange`, {id, pass}, {observe: 'response'});
  }

}
