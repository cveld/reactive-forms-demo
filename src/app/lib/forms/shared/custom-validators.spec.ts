import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomValidators } from './custom-validators';
import { FormControl, AbstractControl } from '@angular/forms';
import { AdresgegevensForm } from 'src/app/stappenWazo/uw-gegevens/adresgegevens/adresgegevens.form';


describe('CustomValidators', () => {

    describe('housenumberValidator', () => {

        it('should return true when not valid housenumber', () => {
            let huisnummer = new FormControl('1111AA');
            const result = CustomValidators.huisnummerBinnenlandValidator(huisnummer);
            expect(result).toEqual({ housenumber: true });
        });

        it('should return null when valid housenumber', () => {
            let huisnummer = new FormControl('111');
            const result = CustomValidators.huisnummerBinnenlandValidator(huisnummer);
            expect(result).toBe(null);
        });

                     

        it('should return null when empty', () => {
            let huisnummer = new FormControl('');
            expect(CustomValidators.huisnummerBinnenlandValidator(huisnummer)).toBe(null);
        });

    });

    describe('woonplaatsValidator', () => {

        it('should return null when empty', () => {
            let woonplaats = new FormControl('');
            expect(CustomValidators.woonplaatsValidator(woonplaats)).toBe(null);
        });

    });


    describe('straatValidator', () => {
        it('should return null when empty', () => {
            let straat = new FormControl('');
            expect(CustomValidators.straatValidator(straat)).toBe(null);
        });

    });

});
