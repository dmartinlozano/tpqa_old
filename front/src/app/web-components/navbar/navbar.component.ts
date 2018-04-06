import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component'

@Component({
  selector: 'tpqa-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }
  listTestProject(){
    this.router.navigate(['/test-projects']);
  }
  logout(){
    this.router.navigate(['/logout']);
  }

}
