import {Component, Input, ModuleWithProviders, NgModule, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MdlPopoverModule} from '@angular-mdl/popover';
import {MdlFabMenuItemComponent} from './fab-menu-item.component'
import {MdlModule} from '@angular-mdl/core'

@Component({
  moduleId: module.id,
  selector: 'tpqa-fab-menu',
  templateUrl: 'fab-menu.component.html',
  styleUrls: ['fab-menu.component.scss']
})
export class MdlFabMenuComponent implements OnInit {

  @Input() alwaysShowTooltips: boolean

  constructor () {
  }

  ngOnInit () {
  }

}

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    MdlPopoverModule
  ],
  exports: [
    MdlFabMenuComponent,
    MdlFabMenuItemComponent
  ],
  declarations: [
    MdlFabMenuComponent,
    MdlFabMenuItemComponent
  ]
})
export class MdlFabMenuModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: MdlFabMenuModule,
      providers: []
    };
  }
}
