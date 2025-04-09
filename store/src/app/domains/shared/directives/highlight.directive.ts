import { Directive, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {

  element = inject(ElementRef);

  constructor() { }

}
