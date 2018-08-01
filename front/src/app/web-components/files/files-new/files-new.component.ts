import { Component, Input, OnChanges  } from '@angular/core';
import { FilesService} from '../files.service';

@Component({
  selector: 'tpqa-files-new',
  templateUrl: './files-new.component.html',
  styles: ['./files-new-view.component.css']
})
export class FilesNewComponent {

  @Input() id: string;
  isUploading = false;
  isImageUploader = false;
  uploadFileText = "";

  constructor(
    private filesService: FilesService
  ) {}

  onFileInput(e):void{
    if (e.target.files.length > 0) {
      this.uploadFileText = e.target.files[0].name;
    }
  }
  upload():void{
    
  }
}
