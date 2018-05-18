import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { MdlSnackbarService } from '@angular-mdl/core';

@Component({
  selector: 'tpqa-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private mdlSnackbarService: MdlSnackbarService
  ) { }

  ngOnInit() {
    //TODO check if token is expired.
  }
  login(){
    this.loginService.login(this.username, this.password).then(token=>{
      this.localStorageService.setItem("username",this.username);
      this.localStorageService.setItem("token",token);
      let lastProjectId = this.localStorageService.getItem('lastProjectId');
      if (lastProjectId === null){
        this.router.navigate([`/test-projects`]);
      }else{
        this.router.navigate([`/test-specifications/${lastProjectId}`]);
      }
    }).catch(err=>{
      this.mdlSnackbarService.showSnackbar({
        message: err.status+" "+err.statusText
      });
      this.localStorageService.removeItem("token");
      console.error(err);
    });
  }

}
