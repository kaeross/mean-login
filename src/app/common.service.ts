import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Config {
  newUser: boolean,
  passwordMatch: boolean,
  loggedIn: boolean
}

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) {}

  requestLogin(user: Object)  {
    return this.http.post<Config>('http://localhost:8080/api/login', user, { observe: 'response' })
  }

  requestRegister(user: Object)  {
    return this.http.post<Config>('http://localhost:8080/api/register', user, { observe: 'response' })
  }
}
