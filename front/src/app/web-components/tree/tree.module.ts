import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TreeComponent } from './tree.component';
import { MdlModule } from '@angular-mdl/core';

@NgModule({
  imports: [CommonModule, HttpModule, MdlModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})
export class TreeModule { }
