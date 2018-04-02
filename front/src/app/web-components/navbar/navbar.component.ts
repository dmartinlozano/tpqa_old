import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component'

@Component({
  selector: 'tpqa-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  loginComponent: LoginComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginComponent = new LoginComponent(route, router);
   }

  ngOnInit() {
  }
  listTestProject(){
    this.router.navigate(['/test-project-list']);
  }
  logout(){
    this.loginComponent.logout();
  }

}
