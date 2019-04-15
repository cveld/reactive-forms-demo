import { OnInit } from '@angular/core';
import { FormGroupDirective, FormArray, AbstractControl } from '@angular/forms';
import { ValidationMessageService } from '../../shared/validation-message.service';
export declare class ValidationMessageForComponent implements OnInit {
    private _form;
    private messageService;
    field: string;
    visible: boolean;
    control: AbstractControl;
    controlErrorMessage: string;
    form: FormGroupDirective;
    constructor(_form: FormGroupDirective, messageService: ValidationMessageService);
    ngOnInit(): void;
    onSubmit(): void;
    onValueChanged(): void;
    checkArrayErrors(array: FormArray): void;
    checkControlErrors(control: AbstractControl): void;
    displayError(error: string | null): void;
}
