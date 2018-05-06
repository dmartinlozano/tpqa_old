import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FilesService {

  constructor(private http:Http) { }
  async list(id){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/attachments/${id}`).toPromise();
    return response.json();
  }
}
