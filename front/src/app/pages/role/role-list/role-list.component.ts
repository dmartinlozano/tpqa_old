import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';

@Component({
  selector: 'tpqa-role-list',
  templateUrl: 'role-list.component.html',
  styleUrls: ['role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles = null;

  constructor(
    private roleService: RoleService
  ) { }

  async ngOnInit() {
    this.roles = await this.roleService.list();
  }

}
