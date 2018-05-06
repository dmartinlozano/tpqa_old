import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TreeService {

  private nodeSelected = new Subject<any>();

  selectNode(data) {
    this.nodeSelected.next(data);
  }
  getNode(): Observable<any> {
      return this.nodeSelected.asObservable();
  }
}
