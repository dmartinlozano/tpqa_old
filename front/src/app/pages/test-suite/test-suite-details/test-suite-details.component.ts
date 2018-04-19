import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TreeService } from '../../../web-components/tree/tree.service';

@Component({
  selector: 'tpqa-test-suite-details',
  templateUrl: 'test-suite-details.component.html'
})
export class TestSuiteDetailsComponent implements OnInit {

  testSuiteId = null;

  constructor(
    private treeService: TreeService
  ) {
    this.treeService.getNode().subscribe(node => {
      if (node.node_type_id === 2){
        this.testSuiteId = node.id;
      }else{
        this.testSuiteId = null;
      }
    });
  }

}
