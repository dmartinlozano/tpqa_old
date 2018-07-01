import { Component, Input, OnChanges  } from '@angular/core';
import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { FilesEditComponent } from '../files-edit/files-edit.component';
import { FilesService} from '../files.service';

@Component({
  selector: 'tpqa-files-list-view',
  templateUrl: './files-list-view.component.html',
  styles: ['./files-list-view.component.css']
})
export class FilesListViewComponent implements OnChanges {

  @Input() id: string;
  @Input() editMode: boolean = false;
  files = null;

  constructor(
    private filesService: FilesService,
    private dialogService: MdlDialogService
  ) {}

  async ngOnChanges() {
    this.filesService.list(this.id).then((files)=>{this.files=files;});
  }
  edit(file){
    this.filesService.setFileSelected(file);
    let pDialog = this.dialogService.showCustomDialog({
      component: FilesEditComponent,
      isModal: true,
      styles: {'width': '500px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
  }

}
