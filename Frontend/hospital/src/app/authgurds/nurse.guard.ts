import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isTokenAvailable = sessionStorage.getItem('token') !== null;
    if(!isTokenAvailable) {
      this.router.navigate(['login']);
      return false;
    } 
    return JSON.parse(sessionStorage.getItem("user")).role === 'NURSE';
  }
  
}
