import { AbstractControl, FormControl, FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
            const result = (
                // is het veld verplicht:
                (!!control.parent && !expression(control.parent.value, controlName)) ||
                // zo ja, controleer dan of het gevuld is
                (!!control.value &&
                // en controleer of IDateModel goed gevuld is
                !(!!control.value.date && !control.value.date.input))) ? null : { RequiredExpressionValidator: true };
                // javascript: input !== '' && input !== undefined && input !== null && input !== false
            return result;
        };
    }

    static ConditionalValidators<T>(expression: (model: T) => boolean, validators: ValidatorFn[], controlName?: string, ) {
        return (control: AbstractControl) => {
            // Is de expressie niet waar? Dan hoeven de validators niet te worden gecontroleerd. Return null
            if (!control.parent || !expression(control.parent.value)) {
                return null;
            }

            const validations = {};
            let errorFound = false;

            validators.forEach(validator => {
                const val = validator(control);

                if (!!val) {
                    errorFound = true;
                    Object.keys(val).forEach(key => {
                        validations[key] = val[key];
                    });
                }
            });

            return errorFound ? validations : null;
        };
    }
}
