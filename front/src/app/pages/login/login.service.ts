import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  async login(username, password): Promise<any>{
    //TODO change by environment url
    return await this.http.post(`http://localhost:8080/api/login`,{"username":username, "password":password}).toPromise();
  }

}
