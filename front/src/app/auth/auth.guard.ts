import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt from 'angular2-jwt-simple';
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private localStorageService: LocalStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.localStorageService.getItem('token');
        if (token){
          try{
            jwt.decode(token, 'TPQA-MOLA-UN-MONTON');
          }catch(e){
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            throw e;
          }
          return true;
        }else{
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        };
    }
}
