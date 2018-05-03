import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenStorageService } from '../core/token-storage.service'
const TOKEN_KEY = 'AuthToken';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(   
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {     
      if (localStorage.getItem(TOKEN_KEY)) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;  
  }
  
  constructor(
    private router: Router,
    private token:TokenStorageService
  ) {}
}
