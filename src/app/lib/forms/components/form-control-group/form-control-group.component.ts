import { Component, Input, AfterContentInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControlName } from '@angular/forms';

@Component({
    selector: 'form-control-group',
    template: `<div class="form-group" [class.has-error]="(hasError && ((control && control.touched) || formDirective.submitted)) || 
                                                          (formGroup?.errors && allControlsValid() && (allControlsTouched() || formDirective.submitted))" >                
                <ng-content></ng-content>                
               </div>`
})
export class FormControlGroupComponent implements AfterContentInit {

    @Input()
    field: string;

    @Input("form")
    formGroup: FormGroup;

    form: FormGroup
    hasError = false;
    control: FormControlName | undefined
    formDirective: FormGroupDirective;

    constructor(private _formDirective: FormGroupDirective) {
        this.formDirective = _formDirective;
    }

    ngAfterContentInit(): void {
        this.form = this.formDirective.form;
        if (!this.formGroup) {
            this.formGroup = this.form;
        }

        this.formDirective.ngSubmit.subscribe(() => this.onSubmit());
        this.control = this.formDirective.directives
            .find(dir => dir.name === this.field);

        if (this.control && this.control.statusChanges) {
            this.control.statusChanges.subscribe(() => this.onValueChanged());
        }

        this.onValueChanged();
    }

    onSubmit() {
        this.onValueChanged();
    }

    onValueChanged() {
        if (!this.formGroup) {
            this.hasError = false;
            return;
        }
        if (this.control && this.control!.control.status === 'INVALID' && (this.control.dirty || this.formDirective.submitted)) {
            this.hasError = true;
        } else {
            this.hasError = false;
        }
    }

    allControlsValid(): boolean {
        for (let key of Object.keys(this.formGroup.controls)) {
            let control = this.formGroup.controls[key];
            if (!control.valid) {
                return false;
            }
        }
        return true;
    }

    allControlsTouched(): boolean {
        for (let key of Object.keys(this.formGroup.controls)) {
            let control = this.formGroup.controls[key];
            if (!control.touched) {
                return false;
            }
        }
        return true;
    }
}