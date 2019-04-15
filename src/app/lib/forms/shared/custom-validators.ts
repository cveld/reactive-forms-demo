import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {

    public static fileName = (NAME_REGEXP: RegExp) => {
        return (control: AbstractControl) => {
            if (control.value && control.value !== null && control.value !== '') {
                if (!NAME_REGEXP.test(control.value.name)) {
                    return { fileName: true };
                }
            };

            return null;
        };
    };

    public static fileExtension = (bijlagenFileTypes: string) => {
        return (control: AbstractControl) => {
            if (control.value && control.value !== null && control.value !== '') {
                let filename = control.value.name as string;
                let indexOfFirstExtensionChar = filename.lastIndexOf('.') + 1;
                let extension = filename.substr(indexOfFirstExtensionChar, filename.length - indexOfFirstExtensionChar).toUpperCase().trim();
                let extensions = bijlagenFileTypes.toUpperCase().split(',');

                if (extensions.indexOf(extension) < 0) {
                    return { fileExtension: true };
                }
            }

            return null;
        };
    }

    public static fileSizeMax = (maxSize: number) => {
        return (control: AbstractControl) => {
            if (control.value && control.value !== null && control.value !== '') {
                if (control.value.size > maxSize) {
                    return { fileSizeMax: true };
                }
            }

            return null;
        };
    }

    public static fileSizeMin = (minSize: number) => {
        return (control: AbstractControl) => {
            if (control.value && control.value !== null && control.value !== '') {
                if (control.value.size <= minSize) {
                    return { fileSizeMin: true };
                }
            }

            return null;
        };
    }

    public static legalCharacterValidator(control: AbstractControl) {
        const NAME_REGEXP = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'"()?!:;\-\t\n\r]+$/;
        return '' + control.value === '' || NAME_REGEXP.test(control.value) ? null : {
            illegalCharacter: {
                valid: false
            }
        };
    }

    public static nameValidator(control: AbstractControl) {
        const NAME_REGEXP = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
        return '' + control.value === '' || NAME_REGEXP.test(control.value) ? null : {
            name: {
                valid: false
            }
        };
    }

    public static emailValidator(control: AbstractControl) {
        const EMAIL_REGEXP = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,63})$/;
        return '' + control.value === '' || EMAIL_REGEXP.test(control.value) ? null : {
            email: {
                valid: false
            }
        };
    }

    public static kvknumberValidator(control: AbstractControl) {
        const KVK_REGEXP = /^[0-9]{8,8}$/;
        return '' + control.value === '' || KVK_REGEXP.test(control.value) ? null : {
            kvknumber: {
                valid: false
            }
        };
    }

    public static numberValidator(control: AbstractControl) {
        let value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        let regex = /^[0-9]+(,[0-9]{1,2})?$/
        let isGetalMetKomma = regex.test(value);
        value = value.replace(",", ".");
        return isGetalMetKomma && !isNaN(value) ? null : {
            number: {
                valid: false
            }
        };
    }

    public static numberValidatorZonder0(control: AbstractControl) {
        let value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        let regex = /^[1-9]+(,[1-9]{1,2})?$/
        let isGetalMetKomma = regex.test(value);
        value = value.replace(",", ".");
        return isGetalMetKomma && !isNaN(value) ? null : {
            numberzondernull: {
                valid: false
            }
        };
    }

    public static housenumberValidator(control: AbstractControl) {
        const HOUSENUMBER_REGEXP = /^[0-9]+$/;
        return '' + control.value === '' || HOUSENUMBER_REGEXP.test(control.value) ? null : {
            housenumber: {
                valid: false
            }
        };
    }

    public static postalcodeValidator(control: AbstractControl) {
        const POSTALCODE_REGEXP = /^([1-9][0-9]{3}[a-z|A-Z]{2})$/;
        return '' + control.value === '' || POSTALCODE_REGEXP.test(control.value) ? null : {
            postalcode: {
                valid: false
            }
        };
    }

    public static phonenumberValidator(control: AbstractControl) {
        const EMAIL_REGEXP = /^0\d{9}$/;
        return '' + control.value === '' || EMAIL_REGEXP.test(control.value) ? null : {
            phonenumber: {
                valid: false
            }
        };
    }

    public static passwordValidator(control: AbstractControl) {
        const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()])[0-9a-zA-Z!@#$%&*()]{8,}$/;
        return '' + control.value === '' || PASSWORD_REGEXP.test(control.value) ? null : {
            password: {
                valid: false
            }
        };
    }

    public static nonNumericValidator(control: AbstractControl) {
        const NONNUMERIC_REGEXP = /^\D*$/;
        return '' + control.value === '' || NONNUMERIC_REGEXP.test(control.value) ? null : {
            nonNumeric: {
                valid: false
            }
        };
    }

    public static factuurNummerValidator(control: AbstractControl) {
        const FACTUUR_NUMMER = /^[a-zA-Z0-9\.\-_]*$/;
        return '' + control.value === '' || FACTUUR_NUMMER.test(control.value) ? null : {
            factuurNr: {
                valid: false
            }
        };
    }

    public static finValidator(control: AbstractControl) {
        const FIN_REGEXP = /^[0-9]{9}$/;
        let valid = false;
        let val = <string>control.value;

        if (val !== '' && val !== '000000000' && FIN_REGEXP.test(val)) {

            let lastDigit = +val[8];
            let total = 0;

            // Add the product of the digit at position n times n to the total.
            for (let i = 0; i < 8; i++) {
                total += +val[i] * (9 - i);
            }

            // Determine the modulus and compare.
            let remainder = total % 11;

            valid = (remainder === lastDigit);
        }

        return valid ? null : {
            fin: false
        };
    }

    public static comparerValidator(group: FormGroup) {
        let valid = true;
        let previous = null;
        let previousSet = false;

        for (let name in group.controls) {
            let val = group.controls[name].value

            if (previousSet) {
                valid = valid && previous === val;
            }
            previous = val;
            previousSet = true;
        }
        return valid ? null : {
            comparer: false
        };
    }

    public static comparerCaseInsesitiveValidator(group: FormGroup) {
        let valid = true;
        let previous = null;
        let previousSet = false;

        for (let name in group.controls) {
            let val = group.controls[name].value

            if (previousSet) {
                valid = valid && previous != null && val != null && previous.toUpperCase() === val.toUpperCase();
            }
            previous = val;
            previousSet = true;
        }
        return valid ? null : {
            comparerCI: false
        };
    }


    public static allowedCharsValidator = (NAME_REGEXP: RegExp) => {
        return (control: AbstractControl) => {
            return '' + control.value === '' || NAME_REGEXP.test(control.value) ? null : {
                allowedChars: {
                    valid: false
                }
            };
        };
    };

    public static dropdownValidator(control: AbstractControl) {
        if (control.value === undefined || control.value === null || control.value === '' || control.value === '0') {
            return { dropdown: true };
        }

        return null;
    }

    public static dropdownValidatorVM(control: AbstractControl) {
        let valid = true;
        let val = control.value;

        if (val === '' || val === '0' || val === null || val === 'XX') {
            valid = false;
        }

        return valid ? null : {
            dropdown: false
        };
    }

    public static dropdownUndefinedValidator(control: AbstractControl) {
        return control.value !== undefined ? null : {
            dropdownUndefined: false
        };
    }

    public static internationalPhoneValidator(control: AbstractControl) {
        const value: string = control.value;
        if (!value || value === '') {
            return null;
        }
        let phoneNumber = value.replace(/ /g, "");

        const numberWithOneDashPattern = /^(?!(.*-){2})/;

        if (!numberWithOneDashPattern.test(phoneNumber)) {
            return {
                phonenumber: {
                    valid: false
                }
            };
        } else {
            phoneNumber = phoneNumber.replace(/-/g, "");
        }

        const dutchNumberWithoutCountryCodePattern = /^0[1-9][0-9]{8}$/;

        if (dutchNumberWithoutCountryCodePattern.test(phoneNumber)) {
            return null;
        }

        const dutchNumberWithCountryCodePattern = /^\+31\d{9}$|^0031\d{9}$/;
        const notDutchNumberPattern = /^\+\d{1,19}$|^00\d{1,18}$/;

        if (phoneNumber.startsWith('0031') || phoneNumber.startsWith('+31')) {
            if (!dutchNumberWithCountryCodePattern.test(phoneNumber)) {
                return {
                    phonenumber: {
                        valid: false
                    }
                };
            }
        }
        else if (!notDutchNumberPattern.test(phoneNumber)) {
            return {
                phonenumber: {
                    valid: false
                }
            };
        }

        return null;
    }

    public static codeloonbelsting(control: AbstractControl) {
        const CODE_REGEXP = RegExp('[0|3|5|6|7][1|2][1-5]|((210)|(220)|(221)|(224)|(225)|(226)|(227)|(228)|(250)|(251)|(940)|(950)|(999))');
        let result = CODE_REGEXP.test(control.value) ? null : { cdloonbelasting: false };
        return result;
    }


    public static validBIC(control: AbstractControl) {
        const CODE_REGEXP = RegExp(/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/);
        let result = CODE_REGEXP.test(control.value) ? null : { invalidbic: false };
        return result;
    }


    public static validateStandaardRekeningnummer(control: AbstractControl) {

        let valid = true;
        let controlValue = control.value;
        if (!isNaN(controlValue) || controlValue === "" || controlValue === null || controlValue === undefined) {
            valid = false;
        }
        else if (controlValue !== "") {
            valid = true;
            if (controlValue.length === 9) {
                var sofinummer = this.padLeft(controlValue, "0", 9);
                var i = 9;
                var total = 0;

                for (var j = 0; j < 9; j++) {
                    var t = sofinummer.toString().substring(j, j + 1);
                    var t2 = parseInt(t);

                    total += t2 * i;
                    i--;
                }
                var rest = parseInt(sofinummer.toString().substring(8, 9));
                valid = ((total % 11) === 0);
            }
        }

        let result = valid ? null : { invalidiban: false };
        return result;
    }


    public static validIBAN(control: AbstractControl) {
        let valid = true;
        let controlValue = control.value;
        if (controlValue === "" || controlValue === null || controlValue === undefined) {
            valid = false;
        }
        else {
            let iban = controlValue.split(' ').join('');
            let ans = CustomValidators.isValidIBANNumber(iban);
            if (Number(ans) === 1)
                valid = true;
            else
                valid = false;
        }
        let result = valid ? null : { invalidiban: false };
        return result;
    }

    private static isValidIBANNumber(input: any) {
        var CODE_LENGTHS = {
            AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
            CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
            FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
            HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
            LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
            MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
            RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
        };
        var iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
            code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
            digits;
        // check syntax and length
        if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
            return false;
        }
        // rearrange country code and check digits, and convert chars to ints
        let text = (code[3] + code[1] + code[2])
        digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter: any) {
            var ans = letter.charCodeAt(0) - 55;
            return ans.toString();
        });
        // final check
        return CustomValidators.mod97(digits);
    }

    private static mod97(str: string) {
        var checksum = str.slice(0, 2), fragment;
        for (var offset = 2; offset < str.length; offset += 7) {
            fragment = String(checksum) + str.substring(offset, offset + 7);
            checksum = String(parseInt(fragment, 10) % 97);
        }
        return checksum;
    }

    private static padLeft(str: string, pad: string, count: number): string {
        while (str.length < count)
            str = pad + str;
        return str;
    }

    public static isNederland(control: AbstractControl) {
        let valid = true;
        let controlValue = control.value;
        if (controlValue === "" || controlValue === null || controlValue === undefined) {
            valid = false;
        }
        else {
            var checkTxt = (controlValue.split(' ').join('')).slice(0, 2);

            if (checkTxt.toUpperCase() === "NL")
                valid = true;
            else
                valid = false;
        }
        let result = valid ? null : { isNietNederland: false };
        return result;

    }

    public static isBuitenland(control: AbstractControl) {
        let valid = true;
        let controlValue = control.value;
        if (controlValue === "" || controlValue === null || controlValue === undefined) {
            valid = false;
        }
        else {
            var checkTxt = (controlValue.split(' ').join('')).slice(0, 2);

            if (checkTxt.toUpperCase() === "NL")
                valid = false;
            else
                valid = true;
        }
        let result = valid ? null : { isNietBuitenland: false };
        return result;
    }
}
