import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TestProjectService } from '../test-project.service';

@Component({
  selector: 'tpqa-test-project-details',
  templateUrl: 'test-project-details.component.html',
  providers: [TestProjectService]
})
export class TestProjectDetailsComponent implements OnInit {

  @Input() nodeSelectedData;
  testProject = null;

  constructor(
    private testProjectService: TestProjectService
  ) { }

  ngOnInit() {}

}
