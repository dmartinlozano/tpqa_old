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

    this.issueTrackers = await this.issueTracerService.list();
    let issueTrackerOfTestProject = this.issueTrackers.find(x => x.testproject_id === this.testProjectSelected.id);
    if (issueTrackerOfTestProject) this.issueTrackerSelectedId = issueTrackerOfTestProject.id;

    this.codeTrakers = await this.codeTracerService.list();
    let codeTrackerOfTestProject = this.codeTrakers.find(x => x.testproject_id === this.testProjectSelected.id);
    if (codeTrackerOfTestProject) this.codeTracersSelectedId = codeTrackerOfTestProject.id;
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
