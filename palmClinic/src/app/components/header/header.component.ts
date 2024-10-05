import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn:boolean = false;
  localStHasValue:boolean = false;
  constructor(private login:LoginService , private router:Router){
    this.login.isLoggedIN.subscribe((status) => {
      this.isLoggedIn = status;
    })
    this.login.localStor.subscribe((status)=>{
      this.localStHasValue = status;
    })
  }
  logout(){
    this.login.localstor()
    this.login.logout();
    this.router.navigate(['/login'] , {replaceUrl : true})
    console.log(this.isLoggedIn)
  }
}
