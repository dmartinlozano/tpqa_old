import { Component } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'tpqa-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) { }

  async login(){
    try{
      if (!this.username || !this.password){
        throw new Error("Complete username and password");
      }
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
      this.localStorageService.removeItem("token");
      throw err;
    }
  }

}
