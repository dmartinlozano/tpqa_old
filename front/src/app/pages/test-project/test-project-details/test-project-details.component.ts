import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TestProjectService } from '../test-project.service';

@Component({
  selector: 'tpqa-test-project-details',
  templateUrl: 'test-project-details.component.html',
  providers: [TestProjectService]
})
export class TestProjectDetailsComponent implements OnInit {

  @Input() nodeSelectedData: any;
  testProjectDetailsHidden = true;
  testProject = null;

  constructor(
    private testProjectService: TestProjectService
  ) { }

  ngOnInit() {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes.nodeSelectedData.currentValue !== null){
      this.nodeSelectedData = changes.nodeSelectedData.currentValue;
      console.log("entra por test-project-details.component");
      console.error(this.nodeSelectedData);
      //this.nodeSelected = nodeSelected.currentValue;
    }
  }

}
