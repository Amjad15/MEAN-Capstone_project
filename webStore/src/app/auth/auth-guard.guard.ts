import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
 /*  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } */
  constructor(private Authguardservice: AuthServiceService, private router: Router){}

  canActivate(): boolean {
     if (!this.Authguardservice.gettoken()) {  
        this.router.navigateByUrl("/login");  
        return false;
    }  
    return !!this.Authguardservice.gettoken(); 
  }
  
}
