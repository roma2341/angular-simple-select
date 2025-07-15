import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxSelectZigzagMultivalueItemTemplate]',
})
export class NgxSelectZigzagMultivalueItemTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
