import { Component,  HostListener, OnInit } from '@angular/core';
import { TestProjectService } from '../test-project.service';
import { IssueTrackerService } from '../../issue-tracker/issue-tracker.service';
import { CodeTrackerService } from '../../code-tracker/code-tracker.service';
import { MdlDialogReference } from '@angular-mdl/core';

@Component({
  selector: 'tpqa-test-project-new-edit',
  templateUrl: 'test-project-new-edit.component.html',
  styleUrls: []
})
export class TestProjectNewEditComponent implements OnInit{

  testProjectSelected = null;
  issueTrackers = null;
  codeTrakers = null;
  issueTrackerSelectedId = null;
  codeTracersSelectedId = null;

  constructor(
     private dialog:  MdlDialogReference,
     private testProjectService: TestProjectService,
     private issueTracerService: IssueTrackerService,
     private codeTracerService: CodeTrackerService
  ) {
  }

  async ngOnInit() {
    this.testProjectSelected = this.testProjectService.getTestProjectSelected();
    if (this.testProjectSelected){
      //edit if not null
      this.issueTrackers = await this.issueTracerService.list();
      let issueTrackerOfTestProject = this.issueTrackers.find(x => x.testproject_id === this.testProjectSelected.id);
      if (issueTrackerOfTestProject) this.issueTrackerSelectedId = issueTrackerOfTestProject.id;

      this.codeTrakers = await this.codeTracerService.list();
      let codeTrackerOfTestProject = this.codeTrakers.find(x => x.testproject_id === this.testProjectSelected.id);
      if (codeTrackerOfTestProject) this.codeTracersSelectedId = codeTrackerOfTestProject.id;
    }else{
      //new if null
      this.testProjectSelected={};
      this.testProjectSelected.name=null;
      this.testProjectSelected.prefix = null;
      this.testProjectSelected.notes = null;
      this.testProjectSelected.options= 'O:8:"stdClass":4:{s:19:"requirementsEnabled";i:0;s:19:"testPriorityEnabled";i:0;s:17:"automationEnabled";i:0;s:16:"inventoryEnabled";i:0;}'
      this.testProjectSelected.active=0;
      this.testProjectSelected.is_public=0;
      this.testProjectSelected.issue_tracker_enabled=0;
      this.testProjectSelected.code_tracker_enabled=0;
    }
  }

   new(){
     //new testProjectSelected
     this.dialog.hide();
   }

   edit(){
     //update testProjectSelected
     this.dialog.hide();
   }

   close(){
     this.dialog.hide();
   }

   @HostListener('keydown.esc')
   public onEsc(): void {
     this.close();
   }

}
