import { Component, Input, OnChanges  } from '@angular/core';
import { FilesService} from '../files.service';

@Component({
  selector: 'tpqa-files-list-view',
  templateUrl: './files-list-view.component.html',
  styles: ['./files-list-view.component.css']
})
export class FilesListViewComponent implements OnChanges {

  @Input() id: string;
  files = null;

  constructor(
    private filesService: FilesService
  ) {}

  async ngOnChanges() {
    this.filesService.list(this.id).then((files)=>{this.files=files;});
  }

}
