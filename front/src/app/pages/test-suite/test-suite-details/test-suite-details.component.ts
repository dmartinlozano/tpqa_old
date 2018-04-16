import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tpqa-test-suite-details',
  templateUrl: 'test-suite-details.component.html'
})
export class TestSuiteDetailsComponent implements OnInit {

  @Input() nodeSelectedData;
  constructor() { }
  ngOnInit() {
  }

}
