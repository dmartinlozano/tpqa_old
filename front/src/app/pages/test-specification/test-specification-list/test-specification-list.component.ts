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
    var _self = this;
    //get testProjectId from param and call specificationService with this param
    this.route.params.subscribe(params => {
       this.testProjectId = +params['testProjectId']; // (+) converts string 'id' to a number
       this.testSpecificationService.loadTree(this.testProjectId).then(function(result){
           _self.testSpecificationTreeData = result;
       });
    });
  }

  showNode(event){
    console.log("entra por test-specification-list.component");
    this.nodeSelected = event;
    console.log(event);
  };
}
