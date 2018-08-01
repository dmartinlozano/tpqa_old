import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'tpqa-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: []
})
export class ResetPasswordComponent implements OnInit {
  userId: number;
  isNewUser: boolean = false;
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    Observable.forkJoin(this.route.params, this.route.queryParams).subscribe(bothParams =>{
      this.userId = +bothParams[0].userId;// (+) converts string 'id' to a number
      this.isNewUser = (bothParams[1].new === "true");
    });
  }

  async resetPassword(){
    await this.userService.resetPassword(this.userId, this.oldPassword, this.newPassword1, this.newPassword2);
    this.router.navigate(["/login"]);
  }

}
