import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControlName } from '@angular/forms';
import { ValidationMessageService } from '../../shared/validation-message.service';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
    selector: 'validation-message-for-form',
    template: `<p [hidden]="!visible || !(allControlsTouched() || formDirective.submitted)" class="form-control-help text-danger">
                <span class="icon text-hide icon-sm icon-help-danger"></span>                
                <validation-message error="defaulterrormessage">Voer een geldige waarde in.</validation-message>
                <ng-content></ng-content>                
               </p>`,
    providers: [ValidationMessageService]
})
export class ValidationMessageForFormComponent implements OnInit {
    visible = false;

    @Input("form")
    formGroup: FormGroup

    form: FormGroup;
    formDirective: FormGroupDirective;

    constructor(private _formDirective: FormGroupDirective, private messageService: ValidationMessageService) {
        this.formDirective = _formDirective;
    }

    ngOnInit(): void {
        this.form = this.formDirective.form;
        if (!this.formGroup) {
            this.formGroup = this.form;
        }        
        this.formDirective.ngSubmit.subscribe(() => this.onSubmit());

        if (this.formDirective && this.formDirective.valueChanges) {
            this.formDirective.valueChanges.subscribe(() => this.onValueChanged());
        }

        this.onValueChanged();
    }

    onSubmit() {
        this.onValueChanged();
    }

    onValueChanged() {
        if (!this.formGroup) {
            this.displayError(null);
            return;
        }

        if (this.formGroup.errors && !this.formGroup.valid &&
            ((this.formDirective.submitted && this.allControlsValid()) || this.allControlsDirtyAndValid())) {
            for (const key in this.formGroup.errors) {
                this.displayError(key);
                break;
            }
        } else {
            this.displayError(null);
        }
    }

    allControlsDirtyAndValid(): boolean {
        for (let key of Object.keys(this.formGroup.controls)) {            
            let control = this.formGroup.controls[key];
            if (!control.dirty || !control.valid) {
                return false;
            }
        }
        return true;
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

    displayError(error: string | null): void {
        var messageSet = false;
        for (let message of this.messageService.getMessages()) {
            message.visible = message.error === error;
            messageSet = messageSet || message.visible;
        }
        this.visible = messageSet;

        if (!messageSet && error != null && error != 'defaulterrormessage') {
            this.displayError('defaulterrormessage');
        }
    }
}