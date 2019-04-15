import { OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { ValidationMessageService } from '../../shared/validation-message.service';
export declare class ValidationMessageForFormComponent implements OnInit {
    private _formDirective;
    private messageService;
    visible: boolean;
    formGroup: FormGroup;
    form: FormGroup;
    formDirective: FormGroupDirective;
    constructor(_formDirective: FormGroupDirective, messageService: ValidationMessageService);
    ngOnInit(): void;
    onSubmit(): void;
    onValueChanged(): void;
    allControlsDirtyAndValid(): boolean;
    allControlsValid(): boolean;
    allControlsTouched(): boolean;
    displayError(error: string | null): void;
}
