import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';
import { TreeService } from '../../../web-components/tree/tree.service';
import { TestCaseService } from '../test-case.service';

import { TestCaseExecutionTypeType } from '../types/test-case-execution_type.type';
import { TestCaseImportanceType } from '../types/test-case-importance.type';
import { TestCaseStatusType } from '../types/test-case-satus.type';

@Component({
  selector: 'tpqa-test-case-details',
  templateUrl: 'test-case-details.component.html',
  styleUrls: ['test-case-details.component.css'],
  providers: [TestCaseService]
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
    private testCaseService: TestCaseService
  ) {}

  ngOnInit() {
    this.treeService.getNode().subscribe(node => {
      var _self = this;
      if (node.node_type_id === 3){
        this.testCaseId = node.id;
        this.testCaseService.getVersions(_self.testCaseId).then(function(result){
            _self.versions = [];
            for (var i=0; i<result.length; i++){
                _self.versions.push({"id":result[i].id, "value":i+1});
            };
            _self.currentVersion = result[result.length - 1];
            _self.testCaseService.getTestCase(_self.testCaseId, _self.currentVersion.id).then(function(result){
                _self.testCase = result;
            });
            _self.testCaseService.getSteps(_self.testCaseId, _self.currentVersion.id).then(function(result){
                _self.stepsTableModel.data=[];
                _self.stepsTableModel.addAll(result);
            });
        });
        this.testCaseService.getKeywords(_self.testCaseId).then(function(result){
            _self.keywords = result;
        });
        this.testCaseService.getRequirements(_self.testCaseId).then(function(result){
            _self.requirementsTableModel.data=[];
            _self.requirementsTableModel.addAll(result);
        });
        this.testCaseService.getRelated(_self.testCaseId).then(function(result){
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
        });
      }else{
        this.testCaseId = null;
        this.currentVersion = null;
        this.versions = null;
        this.testCase=null;
        this.keywords = null;
        this.stepsTableModel.data=[];
        this.requirementsTableModel.data=[];
        this.relatedTableModel.data=[];
        this.requirements = null;
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

  changeVersion(versionId){
    var _self = this;
    this.testCaseService.getTestCase(_self.testCaseId, versionId).then(function(result){
        _self.testCase = result;
    });
    this.testCaseService.getSteps(_self.testCaseId, versionId).then(function(result){
        _self.stepsTableModel.data=[];
        _self.stepsTableModel.addAll(result);
    });
  }
}
