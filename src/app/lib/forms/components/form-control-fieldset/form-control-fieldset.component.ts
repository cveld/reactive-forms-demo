import { Component, Input, AfterContentInit } from '@angular/core';
import { FormGroupDirective, FormControlName } from '@angular/forms';
import { FormControlGroupComponent } from '../form-control-group/form-control-group.component';

@Component({
    selector: 'form-control-fieldset',
    template: `<fieldset class="form-group" [class.has-error]="(hasError && ((control && control.touched) || formDirective.submitted)) || 
                                                          (formGroup?.errors && allControlsValid() && (allControlsTouched() || formDirective.submitted))" >
                <ng-content></ng-content>                
               </fieldset>`
})
export class FormControlFieldsetComponent extends FormControlGroupComponent  {    

    constructor(_formDirective: FormGroupDirective) {
      super(_formDirective);
    }
}
