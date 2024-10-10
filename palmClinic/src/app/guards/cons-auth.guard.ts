import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

 @Injectable({
  providedIn:'root'
})

export class consAuthGuard implements CanActivate{
  isLogged:boolean = false;
   constructor(private login:LoginService){
     this.login.isLoggedIN.subscribe((status)=>{
      this.isLogged = status;
     })
   }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
     if(this.isLogged){
      return true;
     }
     else{
      return false;
     }
   }

}