import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestSuiteService {

  constructor(private http:Http) { }
  async getTestSuite(testSuiteId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testsuites/${testSuiteId}`).toPromise();
    return response.json();
  }
  async getKeywords(testSuiteId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testsuites/${testSuiteId}/keywords`).toPromise();
    return response.json();
  }

}
