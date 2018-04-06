import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
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
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.localStorageService.removeItem("email");
    this.router.navigate(['/login']);
  }

}
