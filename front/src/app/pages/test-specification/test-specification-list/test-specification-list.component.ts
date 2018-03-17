import { Component, OnInit } from '@angular/core';
import {TestSpecificationService} from '../test-specification.service';

@Component({
  selector: 'tpqa-test-specification-list',
  templateUrl: 'test-specification-list.component.html',
  styles: [],
  providers: [TestSpecificationService]
})
export class TestSpecificationListComponent implements OnInit {

  testSpecificationTreeData = null;

  constructor(
    private testSpecificationService: TestSpecificationService
  ) { }

  ngOnInit() {
    var _self = this;
    this.testSpecificationService.loadTree().then(
      function(result){
        _self.testSpecificationTreeData = result;
    });
  }
}
