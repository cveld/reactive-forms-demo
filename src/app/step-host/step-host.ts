import { Directive, ViewContainerRef } from '@angular/core';
/**
 * Attribute directive to mark the destination of the wizard step compontent, it exposes the ViewContainerRef
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uwvWizardStepHost]',
})
export class WizardStepHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
