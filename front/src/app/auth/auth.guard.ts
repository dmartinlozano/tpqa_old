import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private localStorageService: LocalStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.localStorageService.getItem('token');
        if ( token === null && token === undefined){
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        return true;
    }
}
