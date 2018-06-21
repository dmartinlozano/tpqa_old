import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TreeService } from '../../../web-components/tree/tree.service';
import { TestSuiteService } from '../test-suite.service';

@Component({
  selector: 'tpqa-test-suite-details',
  templateUrl: 'test-suite-details.component.html',
  styleUrls: ['test-suite-details.component.css']
})
export class TestSuiteDetailsComponent implements OnInit {

  testSuite = null;
  keywords = null;

  constructor(
    private treeService: TreeService,
    private testSuiteService: TestSuiteService
  ) {}

  ngOnInit() {
    this.treeService.getNode().subscribe(node => {
      var _self = this;
      if (node.node_type_id === 2){
        this.testSuiteService.getTestSuite(node.id).then(function(result){
            _self.testSuite = result;
        });
        this.testSuiteService.getKeywords(node.id).then(function(result){
            _self.keywords = result;
        });
      }else{
        this.testSuite=null;
        this.keywords = null;
      }
    });
  };
}
