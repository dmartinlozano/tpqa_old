import { Component, OnInit } from '@angular/core';
import { TestProjectService } from '../test-project.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { TestProjectNewEditComponent} from '../test-project-new-edit/test-project-new-edit.component';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'tpqa-test-project-list',
  templateUrl: 'test-project-list.component.html',
  styleUrls: ['test-project-list.component.css']
})
export class TestProjectListComponent implements OnInit {

  testProjects = null;

  constructor(
    private testProjectService: TestProjectService,
    private localStorageService: LocalStorageService,
    private dialogService: MdlDialogService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.testProjects = await this.testProjectService.list();
  }

  change(testProjectId){
    this.localStorageService.setItem('lastProjectId', testProjectId);
    this.router.navigate(['/test-specifications/'+testProjectId]);
  };

  async edit(testProjectId){
    let testProject = await this.testProjectService.getTestProject(testProjectId);
    await this.testProjectService.setTestProjectSelected(testProject);
    let pDialog = this.dialogService.showCustomDialog({
      component: TestProjectNewEditComponent,
      isModal: true,
      styles: {'width': '800px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });/*.subscribe(dialogRef => {
       dialogRef.onHide().subscribe(user => {
         if (user){
           this.userService.saveUser(user);
         };
       });
    });*/
  }

  async new(){
    await this.testProjectService.setTestProjectSelected(null);
    let pDialog = this.dialogService.showCustomDialog({
      component: TestProjectNewEditComponent,
      isModal: true,
      styles: {'width': '800px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });/*.subscribe(dialogRef => {
       dialogRef.onHide().subscribe(user => {
         if (user){
           this.userService.saveUser(user);
         };
       });
    });*/
  }

  delete(testProjectId){
    alert("delete: "+testProjectId);
  };

}
