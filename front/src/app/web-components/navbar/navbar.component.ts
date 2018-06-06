import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { LocalStorageService } from '../../auth/local-storage.service';

@Component({
  selector: 'tpqa-navbar',
  templateUrl: 'navbar.component.html',
  styles: ['navbar.component.css']
})
export class NavbarComponent {

  username = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.username = this.localStorageService.getItem("username");
    console.log("username:");
    console.log(this.username);
  }

  listTestProject(){
    this.router.navigate(['/test-projects']);
  }
  logout(){
    this.router.navigate(['/logout']);
  }

}
