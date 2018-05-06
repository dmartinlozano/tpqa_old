import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'tpqa-navbar',
  templateUrl: 'navbar.component.html',
  styles: ['navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router
  ) {}

  listTestProject(){
    this.router.navigate(['/test-projects']);
  }
  logout(){
    this.router.navigate(['/logout']);
  }

}
