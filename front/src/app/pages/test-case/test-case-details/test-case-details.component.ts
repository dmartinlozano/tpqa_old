import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TreeService } from '../../../web-components/tree/tree.service';

@Component({
  selector: 'tpqa-test-case-details',
  templateUrl: 'test-case-details.component.html'
})
export class TestCaseDetailsComponent {

  testCaseId = null;

  constructor(
    private treeService: TreeService
  ) {
    this.treeService.getNode().subscribe(node => {
      if (node.node_type_id === 3){
        this.testCaseId = node.id;
      }else{
        this.testCaseId = null;
      }
    });
  }
}
