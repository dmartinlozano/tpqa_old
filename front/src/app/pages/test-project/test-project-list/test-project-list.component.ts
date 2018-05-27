import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestProjectService } from '../test-project.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'tpqa-test-project-list',
  templateUrl: 'test-project-list.component.html',
  styleUrls: ['test-project-list.component.css'],
  providers: [TestProjectService]
})
export class TestProjectListComponent implements OnInit {

  testProjects = null;

  constructor(
    private testProjectService: TestProjectService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  async ngOnInit() {
    let result = await this.testProjectService.list();
    this.testProjects = result;
  }
  change(testProjectId){
    this.localStorageService.setItem('lastProjectId', testProjectId);
    this.router.navigate(['/test-specifications/'+testProjectId]);
  };

  edit(testProjectId){
    console.log("change: "+testProjectId);
  };

  delete(testProjectId){
    console.log("delete: "+testProjectId);
  };

}
