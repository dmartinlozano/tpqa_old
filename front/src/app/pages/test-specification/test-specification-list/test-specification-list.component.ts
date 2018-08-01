import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestSpecificationService } from '../test-specification.service';

@Component({
  selector: 'tpqa-test-specification-list',
  templateUrl: 'test-specification-list.component.html',
  styles: []
})
export class TestSpecificationListComponent implements OnInit {

  testProjectId: number;
  testSpecificationTreeData = null;
  nodeSelected = null;

  constructor(
    private testSpecificationService: TestSpecificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //get testProjectId from param and call specificationService with this param
    this.route.params.subscribe(async function(params){
       this.testProjectId = +params['testProjectId']; // (+) converts string 'id' to a number
       this.testSpecificationTreeData = await this.testSpecificationService.loadTree(this.testProjectId);
    });
  }

  showNode(event){
    this.nodeSelected = event;
  };
}
