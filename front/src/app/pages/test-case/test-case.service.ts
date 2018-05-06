import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestCaseService {

  constructor(private http:Http) { }
  async getVersions(testCaseId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions`).toPromise();
    return response.json();
  }
  async getTestCase(testCaseId, testCaseVersionId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions/${testCaseVersionId}`).toPromise();
    return response.json();
  }
  async getSteps(testCaseId, testCaseVersionId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions/${testCaseVersionId}/steps`).toPromise();
    return response.json();
  }
  async getKeywords(testCaseId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/keywords`).toPromise();
    return response.json();
  }
  async getRequirements(testCaseId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/requirements`).toPromise();
    return response.json();
  }
  async getRelated(testCaseId){
    //TODO change by environment url
    const response = await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/related`).toPromise();
    return response.json();
  }
}
