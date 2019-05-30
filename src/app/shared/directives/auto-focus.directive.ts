import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[AutoFocus]'
})
export class AutoFocusDirective {

  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) { }

  public ngAfterContentInit() {

      setTimeout(() => {

          this.el.nativeElement.focus();

      }, 500);

  }

}
