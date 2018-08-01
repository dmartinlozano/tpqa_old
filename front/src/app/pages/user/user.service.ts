import { LocalStorageService } from '../../auth/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(
    private http:HttpClient,
    private localStorageService: LocalStorageService
  ) { }
  async list(): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/users`).toPromise();
  }
  async count(): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/users/count`).toPromise();
  }
  async resetPassword(userId, oldPassword, newPassword1, newPassword2): Promise<any>{
    //TODO change by environment url
    let username= this.localStorageService.getItem("username");
    return await this.http.post(`http://localhost:8080/api/users/resetpassword`,
                                  {"username":username,
                                  "oldPassword":oldPassword,
                                  "newPassword1":newPassword1,
                                  "newPassword2":newPassword2
                                }).toPromise();
  }
}
