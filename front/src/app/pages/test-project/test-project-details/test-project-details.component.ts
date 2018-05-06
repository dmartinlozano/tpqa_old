import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { TreeService } from '../../../web-components/tree/tree.service';
import { TestProjectService } from '../test-project.service';

@Component({
  selector: 'tpqa-test-project-details',
  templateUrl: 'test-project-details.component.html',
  providers: [TestProjectService],
  styleUrls: ['test-project-details.component.css'],
})
export class TestProjectDetailsComponent implements OnInit {

  testProject = null;

  constructor(
    private treeService: TreeService,
    private testProjectService: TestProjectService
  ) {}

  ngOnInit() {
    this.treeService.getNode().subscribe(node => {
      var _self = this;
      if (node.node_type_id === 1){
        this.testProjectService.getTestProject(node.id).then(function(result){
            _self.testProject = result;
        });
      }else{
        this.testProject=null;
      }
    });
  };
}
