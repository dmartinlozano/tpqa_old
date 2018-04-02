import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpqa-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  login(){
    localStorage.setItem('currentUser', JSON.stringify({email: "fake@fake.es", token:"fake-token", lastProjectId: 7}));
    this.router.navigate([this.returnUrl]);
  }
  logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

}
