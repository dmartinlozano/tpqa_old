import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TreeComponent } from './tree.component';
import { MdlModule } from '@angular-mdl/core';

@NgModule({
  imports: [CommonModule, HttpClientModule, MdlModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})
export class TreeModule { }
