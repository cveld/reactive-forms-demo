import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroupDirective, FormControlName } from '@angular/forms';

@Directive({
    selector: '[server-errors]'
})
export class ServerErrorsComponent implements OnChanges {
    @Input('server-errors')
    errors: any;
    control: FormControlName;

    constructor(private form: FormGroupDirective) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.errors && this.errors.status === 400) {
            let serverError = JSON.parse(this.errors._body);
            if (serverError.modelState) {
                for (const error in serverError.modelState) {
                    let fieldName = error.slice(error.indexOf('.') + 1).toLowerCase();
                    let control = this.form.directives
                        .find(dir => dir.name.toLowerCase() === fieldName);
                    if (control) {
                        control.control.setErrors({ 'server-error': serverError.modelState[error][0] }, { emitEvent: true });
                    }
                }
            }
        }
    }
}