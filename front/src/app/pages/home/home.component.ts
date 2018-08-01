import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpqa-home',
  template: `
    <p>
      home!
    </p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    let username = this.localStorageService.getItem('username');
    if (username === null){
      this.router.navigate(["/login"]);
    }else{
      let lastProjectId = this.localStorageService.getItem('lastProjectId');
      if (lastProjectId === null){
        this.router.navigate([`/test-projects`]);
      }else{
        this.router.navigate([`/test-specifications/${lastProjectId}`]);
      }
    }
  }

}
