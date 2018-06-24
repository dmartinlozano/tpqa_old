import { NgModule } from '@angular/core';
import { MdlModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//to delete:
import { PopoverModule } from 'ngx-bootstrap';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlSelectModule } from '@angular-mdl/select';
import { MdlExpansionPanelModule } from '@angular-mdl/expansion-panel';
import { NgxEditorComponent } from './ngx-editor.component';
import { NgxGrippieComponent } from './ngx-grippie/ngx-grippie.component';
import { NgxEditorMessageComponent } from './ngx-editor-message/ngx-editor-message.component';
import { NgxEditorToolbarComponent } from './ngx-editor-toolbar/ngx-editor-toolbar.component';
import { MessageService } from './common/services/message.service';
import { CommandExecutorService } from './common/services/command-executor.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MdlModule, MdlPopoverModule, MdlSelectModule, MdlExpansionPanelModule,PopoverModule.forRoot()],
  declarations: [NgxEditorComponent, NgxGrippieComponent, NgxEditorMessageComponent, NgxEditorToolbarComponent],
  exports: [NgxEditorComponent, PopoverModule],
  providers: [CommandExecutorService, MessageService]
})

export class NgxEditorModule { }
