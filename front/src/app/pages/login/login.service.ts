import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }
  async login(username, password){
    //TODO change by environment url
    const response = await this.http.post(`http://localhost:8080/api/login`,{"username":username, "password":password}).toPromise();
    return response.json();
  }

}
