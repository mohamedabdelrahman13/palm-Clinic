import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  @ViewChild('aboutP') aboutP!:ElementRef<HTMLElement>
  @ViewChild('item1') item1!:ElementRef<HTMLElement>
  @ViewChild('item2') item2!:ElementRef<HTMLElement>
  constructor(private translate:TranslateService){
    translate.setDefaultLang('en');
  }
  translateLang(lang:string){
    this.translate.use(lang)
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if(scrollY >= 200)
    {
      this.aboutP.nativeElement.classList.add('mainPos')
      this.aboutP.nativeElement.classList.remove('about-p')
    }
    if(scrollY >= 750)
    {
      this.item1.nativeElement.classList.add('mainPos')
      this.item1.nativeElement.classList.remove('item1')
      this.item2.nativeElement.classList.add('mainPos')
      this.item2.nativeElement.classList.remove('item2')
    }

  }

  
}
