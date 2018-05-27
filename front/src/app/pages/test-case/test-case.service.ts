import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestCaseService {

  constructor(private http:HttpClient) { }
  async getVersions(testCaseId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions`).toPromise();
  }
  async getTestCase(testCaseId, testCaseVersionId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions/${testCaseVersionId}`).toPromise();
  }
  async getSteps(testCaseId, testCaseVersionId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/versions/${testCaseVersionId}/steps`).toPromise();
    }
  async getKeywords(testCaseId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/keywords`).toPromise();
  }
  async getRequirements(testCaseId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/requirements`).toPromise();
  }
  async getRelated(testCaseId): Promise<any>{
    //TODO change by environment url
    return await this.http.get(`http://localhost:8080/api/testcases/${testCaseId}/related`).toPromise();
  }
}
