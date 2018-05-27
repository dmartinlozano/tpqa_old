import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestSuiteService {

  constructor(private http:HttpClient) { }
  async getTestSuite(testSuiteId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testsuites/${testSuiteId}`).toPromise();
  }
  async getKeywords(testSuiteId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testsuites/${testSuiteId}/keywords`).toPromise();
  }

}
