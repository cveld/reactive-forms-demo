import { AbstractControl } from '@angular/forms';
import { IDate, IDateModel } from '../../lib/date-picker/interfaces';

export class DatumValidators {
    private static isValid(date: IDate): boolean {
        // datepicker geeft bij invalide datums 0 0 0 terug.
        return date.month > 0 && date.year > 0 && date.day > 0;
    }

    private static isDatumNietInGevuld(control: AbstractControl): boolean {
        const datumNietIngevuld: boolean = !control || !control.value
        || !control.value.date || control.value.date.input === '' || !control.value.date.input;
        return datumNietIngevuld;
    }

    public static datumNietValide(control: AbstractControl) {
        if (DatumValidators.isDatumNietInGevuld(control)) {
            return null;
        }

        return !DatumValidators.isDatumValid(control) ? { date: true } : null;
    }

    public static isDatumValid(control: AbstractControl): boolean {
        if (DatumValidators.isDatumNietInGevuld(control)) {
            return false;
        }

        const value = control.value.date;
        return !DatumValidators.isValid(value) ? false : true;
    }

    public static datumNietInToekomst(control: AbstractControl) {
        if (DatumValidators.isDatumNietInGevuld(control)) {
            return null;
        }
        const value = control.value.date;
        if (value) {
            const opgegevenDatum = new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0);
            const vandaag = new Date();
            vandaag.setHours(0, 0, 0, 0);
            return opgegevenDatum.getTime() <= vandaag.getTime() ? null : { toekomst: true };
        }

        return null;
    }

    public static isNietOuderDanx(control: AbstractControl) {
        if (DatumValidators.isDatumNietInGevuld(control)) {
            return null;
        }

        const value = control.value.date;
        const vandaag = new Date();
        const eenJaarTerug = new Date(vandaag.getFullYear() - 1, vandaag.getMonth(), vandaag.getDate(), 0, 0, 0, 0);
        const opgegevenDatum = new Date(value.year, value.month - 1, value.day);
        return opgegevenDatum > eenJaarTerug ? null : { langgeleden: true };
    }

    public static isGroterDanGelijkAan(control: AbstractControl, date: Date) {
        if (DatumValidators.isDatumNietInGevuld(control)) {
            return null;
        }

        const value = control.value.date;
        return value >= date ? null : { kleinerdan: true };
    }

    public static valideIDateModel(date: IDateModel) {
        if (!date || date.date.day === 0 || date.date.month === 0 || date.date.year === 0) {
            return false;
        }
        return true;
    }
}
