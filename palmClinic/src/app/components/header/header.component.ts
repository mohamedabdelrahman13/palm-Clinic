import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LanguagesService } from '../../services/languages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn:boolean = false;
  localStHasValue:boolean = false;
  english:boolean = false;
  currentLangHome:boolean = false;
  constructor(private login:LoginService 
    , private router:Router
    ,private lang:LanguagesService,
    
    private translate:TranslateService){
    this.login.isLoggedIN.subscribe((status) => {
      this.isLoggedIn = status;
    })
    this.login.localStor.subscribe((status)=>{
      this.localStHasValue = status;
    })
    this.lang.getCurrentLang.subscribe((status)=>{
      this.english = status;
    })
    this.lang.getCurrentLangHome.subscribe((status)=>{
      this.currentLangHome = status;
    })
  }
  logout(){
    this.login.localstor()
    this.login.logout();
    this.router.navigate(['/login'] , {replaceUrl : true})
    console.log(this.isLoggedIn)
  }
  translateLang(lang:string){
    this.translate.use('lang')
  }
  
  
  translateAr(){
    this.lang.switchLangAR();
    this.lang.arabic();
  }

  translateEn(){
    this.lang.switchLangEN();
    this.lang.english();
  }
}
