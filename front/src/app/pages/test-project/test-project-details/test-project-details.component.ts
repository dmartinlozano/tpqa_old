import { Component, OnInit } from '@angular/core';
import { TestProjectService } from '../test-project.service';

@Component({
  selector: 'tpqa-test-project-details',
  templateUrl: 'test-project-details.component.html',
  providers: [TestProjectService]
})
export class TestProjectDetailsComponent implements OnInit {

  testProjectDetailsHidden = true;
  testProject = null;

  constructor(
    private testProjectService: TestProjectService
  ) { }

  ngOnInit() {}

  hidden(){
    this.testProjectDetailsHidden = true;
  };

}
