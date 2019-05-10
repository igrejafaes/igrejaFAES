import { Directive, HostListener, Input } from'@angular/core';
@Directive({
    selector: '[onReturnSendTab]'
})
export class ReturnToTabDirective {

  @Input() onReturnSendTab: string;

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    
    if ((e.which == 13 || e.keyCode == 13)) {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form.elements, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
}
