import { Component,  HostListener, OnInit } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { FilesService} from '../files.service';

@Component({
  selector: 'files-edit',
  templateUrl: 'files-edit.component.html',
  styleUrls: []
})
export class FilesEditComponent implements OnInit{

  file = null;

  constructor(
    private filesService: FilesService,
    private dialog:  MdlDialogReference
  ) {
  }

  async ngOnInit() {
    this.file = this.filesService.getFileSelected();
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
