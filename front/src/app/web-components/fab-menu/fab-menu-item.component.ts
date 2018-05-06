import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {MdlFabMenuComponent} from './fab-menu.component'

@Component({
  moduleId: module.id,
  selector: 'tpqa-fab-menu-item',
  templateUrl: 'fab-menu-item.component.html',
  styleUrls: ['fab-menu-item.component.scss']
})
export class MdlFabMenuItemComponent implements OnInit {

  @Input() label: string
  @Input() icon: string
  @Input() fabMenu: MdlFabMenuComponent
  @Output('menu-clicked') menuClick: EventEmitter<any> = new EventEmitter()

  isHoovering: boolean = false

  constructor () {
  }

  ngOnInit () {
    this.isHoovering = false
  }

}
