import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroupDirective, FormControlName, FormArray, FormArrayName, FormControl, AbstractControl } from '@angular/forms';
import { ValidationMessageService } from '../../shared/validation-message.service';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
    selector: 'validation-message-for',
    template: `<p *ngIf="visible && (control?.touched || form.submitted)" class="form-control-help text-danger">
                <span class="icon text-hide icon-sm icon-help-danger"></span>
                <validation-message error="server-error">{{controlErrorMessage}}</validation-message>
                <validation-message error="defaulterrormessage">Voer een geldige waarde in.</validation-message>
                <ng-content></ng-content>                
               </p>`,
    providers: [ValidationMessageService]
})
export class ValidationMessageForComponent implements OnInit, AfterViewInit {
    @Input()
    field: string;

    visible = false;
    control: AbstractControl;
    controlErrorMessage: string;

    form: FormGroupDirective;


    constructor(private _form: FormGroupDirective, private messageService: ValidationMessageService) {
        this.form = _form;
    }

    ngOnInit(): void {
        this.form.ngSubmit.subscribe(() => this.onSubmit());

        this.control = this.form.control.get(this.field);

        if (this.control && this.control.statusChanges) {
            this.control.statusChanges.subscribe(() => {
                this.onValueChanged();
            });
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.onValueChanged();
        }, 0);
    }

    onSubmit() {
        this.onValueChanged();
    }

    onValueChanged() {
        if (!this.form || !this.control) {
            this.displayError(null);
            return;
        }

        this.checkControlErrors(this.control);
        if (!this.visible) {
            if (this.control instanceof FormArray) {
                this.checkArrayErrors(this.control as FormArray);
            }
        }
    }

    checkArrayErrors(array: FormArray): void {
        for (let control of array.controls) {
            if (control.errors && !control.valid && (control.dirty || this.control.dirty || this.form.submitted)) {
                const key = Object.keys(control.errors)[0];
                this.displayError(key);
                this.controlErrorMessage = control.errors[key];
                return;
            }
        }
        this.displayError(null);
    }

    checkControlErrors(control: AbstractControl): void {
        if (control.errors && !control.valid && (control.dirty || this.form.submitted)) {
            const key = Object.keys(control.errors)[0];
            this.displayError(key);
            this.controlErrorMessage = control.errors[key];
        } else {
            this.displayError(null);
        }
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