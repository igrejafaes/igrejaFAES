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
      // check exists next form element
      if(form.elements[index + 1] && form.elements[index + 1].disabled == false) {
        form.elements[index + 1].focus();
      } else { // if not exists return to first element
        form.elements[0].focus(); 
      }
      // prevent default
      event.preventDefault();
    }
  }
}
