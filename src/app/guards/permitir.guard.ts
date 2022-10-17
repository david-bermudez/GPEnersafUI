import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermitirGuard implements CanActivate, CanLoad {


  constructor(private login:LoginService){

  }
  canActivate(): Observable<boolean> | boolean  {

    if(localStorage.getItem('token')){

      return true;
    }

    return false
  }
  canLoad(): Observable<boolean> | boolean  {
    if(localStorage.getItem('token')){

      return true;
    }

    return false
  }
}
