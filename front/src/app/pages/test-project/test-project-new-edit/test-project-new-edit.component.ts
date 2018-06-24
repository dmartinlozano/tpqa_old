import { Component,  HostListener } from '@angular/core';
import { TestProjectService } from '../test-project.service';
import { MdlDialogReference } from '@angular-mdl/core';

@Component({
  selector: 'tpqa-test-project-new-edit',
  templateUrl: 'test-project-new-edit.component.html',
  styleUrls: []
})
export class TestProjectNewEditComponent {

  testProjectSelected = null;

  constructor(
     private dialog: MdlDialogReference,
     private testProjectService: TestProjectService
  ) {
    this.testProjectSelected = this.testProjectService.getTestProjectSelected();
    console.log(this.testProjectSelected);
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
