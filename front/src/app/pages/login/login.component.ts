import { Component } from '@angular/core';
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
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private mdlSnackbarService: MdlSnackbarService
  ) { }

  async login(){
    try{
      let response = await this.loginService.login(this.username, this.password);
      this.localStorageService.setItem("username",this.username);
      this.localStorageService.setItem("token",response.token);
      let lastProjectId = this.localStorageService.getItem('lastProjectId');
      if (lastProjectId){
        this.router.navigate([`/test-specifications/${lastProjectId}`]);
      }else{
        this.router.navigate([`/test-projects`]);
      }
    }catch(err){
      console.error(err);
      this.mdlSnackbarService.showSnackbar({
        message: err.status+" "+err.statusText
      });
      this.localStorageService.removeItem("token");
    }
  }

}
