import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpqa-login',
  template: `
     <button type='button' name='btn_login' (click)='login()' class='col s12 btn btn-large waves-effect'>Login</button>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(){
    localStorage.setItem('currentUser', {email: "fake@fake.es", token:"fake-token"});
    this.router.navigate(['/home']);
    //this.router.navigate([this.returnUrl]);
  }

}
