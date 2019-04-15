import { AfterContentInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControlName } from '@angular/forms';
export declare class FormControlGroupComponent implements AfterContentInit {
    private _formDirective;
    field: string;
    formGroup: FormGroup;
    form: FormGroup;
    hasError: boolean;
    control: FormControlName | undefined;
    formDirective: FormGroupDirective;
    constructor(_formDirective: FormGroupDirective);
    ngAfterContentInit(): void;
    onSubmit(): void;
    onValueChanged(): void;
    allControlsValid(): boolean;
    allControlsTouched(): boolean;
}
