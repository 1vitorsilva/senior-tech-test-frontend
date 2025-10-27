import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTelefoneMask]'
})
export class TelefoneMaskDirective {
  constructor(@Optional() @Self() private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.control) return; // segurança

    let value = this.control.control?.value || '';
    value = value.replace(/\D/g, ''); // remove tudo que não é número
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 6) {
      value = `(${value.substring(0,2)}) ${value.substring(2,7)}-${value.substring(7)}`;
    } else if (value.length > 2) {
      value = `(${value.substring(0,2)}) ${value.substring(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    this.control.control?.setValue(value, { emitEvent: false });
  }
}
