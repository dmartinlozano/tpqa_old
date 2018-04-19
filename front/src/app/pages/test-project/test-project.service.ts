import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestProjectService {

  constructor(private http:Http) { }
  async list(){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testprojects`).toPromise();
    return response.json();
  }

}
