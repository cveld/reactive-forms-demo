import { AbstractControl, FormControl, FormArray, FormGroup } from '@angular/forms';

export class FormValidators {
    static validateForm(control: AbstractControl, emitEvent: boolean) {
        if (control instanceof FormControl) {
            control.markAsTouched();
            control.markAsDirty();
            control.updateValueAndValidity({ emitEvent });
        } else if (control instanceof FormArray) {
            control.markAsTouched({ onlySelf: true });
            control.markAsDirty({ onlySelf: true });
            control.updateValueAndValidity({ onlySelf: true, emitEvent });
            for (const childControl of control.controls) {
                this.validateForm(childControl, emitEvent);
            }
        } else if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach(field => {
                const childControl = control.get(field);
                this.validateForm(childControl, emitEvent);
            });
        }
    }

    // expression is true betekent dat het veld verplicht is
    static RequiredExpressionValidator<T>(expression: (model: T, controlName) => boolean, controlName?: string) {
        return (control: AbstractControl) => {
            return (!!control.parent && (!expression(control.parent.value, controlName) || !!control.value)) ? null : { RequiredExpressionValidator: true };
        };
    }
}
