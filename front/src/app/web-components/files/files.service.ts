import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FilesService {

  constructor(private http:HttpClient) { }
  async list(id): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/attachments/${id}`).toPromise();
  }
}
