import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TreeService } from '../../../web-components/tree/tree.service';
import { TestProjectService } from '../test-project.service';

@Component({
  selector: 'tpqa-test-project-details',
  templateUrl: 'test-project-details.component.html',
  providers: [TestProjectService]
})
export class TestProjectDetailsComponent implements OnInit {

  testProjectId = null;

  constructor(
    private treeService: TreeService
  ) {
    this.treeService.getNode().subscribe(node => {
      if (node.node_type_id === 1){
        this.testProjectId = node.id;
      }else{
        this.testProjectId = null;
      }
    });
  }
}
