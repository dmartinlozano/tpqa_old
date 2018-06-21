import { Component, OnInit } from '@angular/core';
import { TestProjectService } from '../../test-project/test-project.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'tpqa-role-by-test-project',
  templateUrl: 'role-by-test-project.component.html',
  styleUrls: ['role-by-test-project.component.css']
})
export class RoleByTestProjectComponent implements OnInit {

  roles = null;

  constructor(
    private roleService: RoleService
  ) { }

  async ngOnInit() {
    this.roles = await this.roleService.getRolesByTestProject();
  }

}
