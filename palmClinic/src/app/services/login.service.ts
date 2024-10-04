import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private loggedIN = new BehaviorSubject<boolean>(false);
   private localS = new BehaviorSubject<boolean>(false);
   
  constructor(private http:HttpClient) { }

  get isLoggedIN(){
    return this.loggedIN.asObservable();
  }
  get localStor(){
    return this.localS.asObservable();
  }

localstor(){
  if(localStorage.getItem('token')){
    this.localS.next(true);
  }
  else{
    this.localS.next(false);
  }
}

  Login(token:string){
    localStorage.setItem('token' , token);
    this.loggedIN.next(true);
  }
  
  logout(){
    localStorage.removeItem('token');
    this.loggedIN.next(false);
  }
}
