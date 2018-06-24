import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';
import { TreeService } from '../../../web-components/tree/tree.service';
import { TestCaseService } from '../test-case.service';

//import {FilesListViewComponent} from '../../../web-components/files/files-list-view/files-list-view.component';

import { TestCaseExecutionTypeType } from '../types/test-case-execution_type.type';
import { TestCaseImportanceType } from '../types/test-case-importance.type';
import { TestCaseStatusType } from '../types/test-case-satus.type';

@Component({
  selector: 'tpqa-test-case-details',
  templateUrl: 'test-case-details.component.html',
  styleUrls: ['test-case-details.component.css']//,
  //providers: [FilesListViewComponent]
})
export class TestCaseDetailsComponent implements OnInit {

  currentVersion = null;
  versions = null;
  testCase = null;
  testCaseId = null;
  keywords = null;
  requirements = null;

  stepsTableModel = new MdlDefaultTableModel([
     {key:'step_number', name:'#', sortable:true, numeric: true},
     {key:'actions', name:'Step Actions', sortable:true},
     {key:'expected_results', name:'Expected Results', sortable:true}
  ]);

  requirementsTableModel = new MdlDefaultTableModel([
     {key:'doc_id', name:'Requirement Specification', sortable:true},
     {key:'req_doc_id', name:'Requirement Operation', sortable:true}
  ]);

  relatedTableModel = new MdlDefaultTableModel([
     {key:'relation', name:'Type', sortable:true},
     {key:'name', name:'Test case', sortable:true},
     {key:'login', name:'Set by', sortable:true}
  ]);

  constructor(
    private treeService: TreeService,
    private testCaseService: TestCaseService//,
    //private filesListViewComponent: FilesListViewComponent
  ) {}

  async ngOnInit() {
    var _self = this;
    this.treeService.getNode().subscribe(async function(node){
      if (node.node_type_id === 3){
        _self.testCaseId = node.id;
        let versions = await _self.testCaseService.getVersions(_self.testCaseId);
        _self.versions = versions.map((x,i)=> {return {"id":x.id, "value":i+1};});
        _self.currentVersion = _self.versions[_self.versions.length -1];
        _self.testCase = await _self.testCaseService.getTestCase(_self.testCaseId, _self.currentVersion.id);
        _self.stepsTableModel.data=[];
        let result = await _self.testCaseService.getSteps(_self.testCaseId, _self.currentVersion.id);
        _self.stepsTableModel.addAll(result);
        _self.keywords = await _self.testCaseService.getKeywords(_self.testCaseId);
        _self.requirementsTableModel.data=[];
        result = await _self.testCaseService.getRequirements(_self.testCaseId);
        _self.requirementsTableModel.addAll(result);
        result = await _self.testCaseService.getRelated(_self.testCaseId);
        _self.relatedTableModel.data=[];
        let tmp=[];
        for (let i=0;i<result.length;i++){
          let x = result[i];
          switch(x.relation_type){
            case 1:
                (x.type == 0) ? x.relation = "parent of": x.relation = "child of";
                break;
            case 2:
                (x.type == 0) ? x.relation = "blocks": x.relation = "depends on";
                break;
            default:
                x.relation = "is related to";
          };
          tmp.push(x);
        };
        _self.relatedTableModel.addAll(tmp);
        //_self.filesListViewComponent.ngOnInit();
      }else{
        _self.testCaseId = null;
        _self.currentVersion = null;
        _self.versions = null;
        _self.testCase=null;
        _self.keywords = null;
        _self.stepsTableModel.data=[];
        _self.requirementsTableModel.data=[];
        _self.relatedTableModel.data=[];
        _self.requirements = null;
      }
    });
  };

  getStatus(number){
    return TestCaseStatusType[number];
  }

  getImportance(number){
    return TestCaseImportanceType[number];
  }

  getExecutionType(number){
    return TestCaseExecutionTypeType[number];
  }

  async changeVersion(versionId){
    this.testCase = this.testCaseService.getTestCase(this.testCaseId, versionId);
    this.stepsTableModel.data=[];
    let result = await this.testCaseService.getSteps(this.testCaseId, versionId);
    this.stepsTableModel.addAll(result);
  }
}
