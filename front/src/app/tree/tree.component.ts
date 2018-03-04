import { Component, Input, Output, OnInit} from '@angular/core';
import { animate, transition, trigger, state, style} from '@angular/animations';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TreeNode } from 'app/tree/tree-node.model';

const animationDuration = 0.2; // open / close animation duration in seconds
const easeInQuad: string = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
const easeOutQuad: string = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';


@Component({
  selector: 'tpqa-tree',
  templateUrl: 'tree.component.html',
  styles: []
})
export class TreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
