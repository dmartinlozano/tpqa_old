import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'tpqa-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = null;

  constructor(
      private userService: UserService
  ) { }

  async ngOnInit() {
      this.users = await this.userService.list();
  }

}
