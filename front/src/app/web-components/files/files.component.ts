import { Component, OnInit, Input } from '@angular/core';
import { FilesService} from './files.service';

@Component({
  selector: 'tpqa-files',
  templateUrl: './files.component.html',
  providers: [FilesService],
  styles: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Input() id: string;

  files = null;

  constructor(
    private filesService: FilesService
  ) {}

  ngOnInit() {
    this.filesService.list(this.id).then(result => {
      this.files = result;
    })
   }

}
