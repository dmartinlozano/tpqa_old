import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpqa-logout',
  template: `
    <p>
      logout!
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

}
