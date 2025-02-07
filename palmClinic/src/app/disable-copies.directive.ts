import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableCopies]'
})
export class DisableCopiesDirective {

  constructor() {}

  @HostListener('copy' , ['$event']) onCopy(event:ClipboardEvent){
    event.preventDefault();
  }

  @HostListener('contextmenu' , ['$event']) onRightClick(event:MouseEvent){
    event.preventDefault();
  }

}
