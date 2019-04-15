import { AbstractControl, FormGroup } from '@angular/forms';
export declare class CustomValidators {
    static firstnameValidator(control: AbstractControl): {
        firstname: {
            valid: boolean;
        };
    };
    static lastnameValidator(control: AbstractControl): {
        lastname: {
            valid: boolean;
        };
    };
    static middlenameValidator(control: AbstractControl): {
        middlename: {
            valid: boolean;
        };
    };
    static alphabetValidator(control: AbstractControl): {
        alphabet: {
            valid: boolean;
        };
    };
    static emailValidator(control: AbstractControl): {
        email: {
            valid: boolean;
        };
    };
    static kvknumberValidator(control: AbstractControl): {
        kvknumber: {
            valid: boolean;
        };
    };
    static housenumberValidator(control: AbstractControl): {
        housenumber: {
            valid: boolean;
        };
    };
    static postalcodeValidator(control: AbstractControl): {
        postalcode: {
            valid: boolean;
        };
    };
    static phonenumberValidator(control: AbstractControl): {
        phonenumber: {
            valid: boolean;
        };
    };
    static passwordValidator(control: AbstractControl): {
        password: {
            valid: boolean;
        };
    };
    static nonNumericValidator(control: AbstractControl): {
        nonNumeric: {
            valid: boolean;
        };
    };
    static finValidator(control: AbstractControl): {
        fin: boolean;
    };
    static comparerValidator(group: FormGroup): {
        comparer: boolean;
    };
    static allowedCharsValidator: (NAME_REGEXP: RegExp) => (control: AbstractControl) => {
        allowedChars: {
            valid: boolean;
        };
    };
    static dropdownValidator(control: AbstractControl): {
        dropdown: boolean;
    };
    static internationalPhoneValidator(control: AbstractControl): {
        phonenumber: {
            valid: boolean;
        };
    };
}
