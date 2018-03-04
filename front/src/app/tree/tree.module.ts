import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})
export class TreeModule { }
