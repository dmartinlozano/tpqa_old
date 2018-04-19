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

/*  sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }*/
}
