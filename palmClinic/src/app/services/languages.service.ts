import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private currentLang = new BehaviorSubject<boolean>(false);
  private currentLangHome = new BehaviorSubject<boolean>(false);
  constructor(private translate:TranslateService) {
    this.translate.setDefaultLang('en');
  }

  get getCurrentLang(){
     return this.currentLang.asObservable();
  }
  get getCurrentLangHome(){
     return this.currentLangHome.asObservable();
  }

  switchLangAR(){
    this.currentLangHome.next(true)
    this.translate.use('ar')
  }
  
  switchLangEN(){
    this.currentLangHome.next(false)
    this.translate.use('en')
  }
  
  english(){
    this.currentLang.next(false);
  }
  arabic(){
    this.currentLang.next(true);
  }

  
}
