import { DatumValidators } from '../forms/datum-validators';
import { IDateModel } from '../../lib/date-picker/interfaces';
import { KeuzeStartUitkeringEnum } from '../enums/keuzeStartUitkering.enum';

/** Geeft het datuminterval terug waarin de uitkeringsdatum moet vallen en compenseert voor een bevallingsdatum in deze flexperiode */
export function flexibiliseringsperiodeMetDatumBevalling(meerling: boolean, datumVermoedelijkeBevalling: IDateModel, bevallen: boolean, datumBevalling: IDateModel): { min: Date, max: Date } {
    const berekendeflexibiliseringsperiode = flexibiliseringsperiode(meerling, datumVermoedelijkeBevalling);
    if (bevallen
        && DatumValidators.valideIDateModel(datumBevalling)
        && datumBevalling.jsdate >= berekendeflexibiliseringsperiode.min
        && datumBevalling.jsdate < berekendeflexibiliseringsperiode.max
        ) {
            berekendeflexibiliseringsperiode.max = datumBevalling.jsdate;
    }
    return berekendeflexibiliseringsperiode;
}

/** Berekent op basis van de vermoedelijke bevallingsdatum de flexperiode. Deze is afhankelijk van meerlingen:
 *  * geen meerlingen: 6-4wk
 *  * meerlingen: 10-8wk
 */
export function flexibiliseringsperiode(meerling: boolean, datumVermoedelijkeBevalling: IDateModel): {min: Date, max: Date} {
    let result;
    if (!meerling) {
        result = {
            min: addDays(datumVermoedelijkeBevalling.jsdate, 1 + ( -6 * 7)),
            max: addDays(datumVermoedelijkeBevalling.jsdate, 1 + (-4 * 7))
        };
    } else {
        result = {
            min: addDays(datumVermoedelijkeBevalling.jsdate, 1 + (-10 * 7)),
            max: addDays(datumVermoedelijkeBevalling.jsdate, 1 + (-8 * 7))
        };
    }

    return result;
}

/** functie om dagen op te tellen bij een javascript Date object met behoud van de timezone */
function addDays(date: Date, days: number): Date {
    if (!date) {
        return undefined;
    }
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function datumOuderDanEenJaar(date: Date) {
    if (!date) {
        return;
    }
    const vorigjaar = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    return date < vorigjaar;
}

/** bepaalt op basis van bevallingsdatum en flexperiode of de situatie een vroeggeboorte betreft */
export function vroeggeboorte(meerling: boolean, datumVermoedelijkeBevalling: IDateModel, datumBevalling: IDateModel): boolean {
    if (!DatumValidators.valideIDateModel(datumVermoedelijkeBevalling)
    || !DatumValidators.valideIDateModel(datumBevalling)) {
        return undefined;
    }
    const b = datumBevalling.jsdate < flexibiliseringsperiode(meerling, datumVermoedelijkeBevalling).min;
    return b;
}

export function uitkeringsjaar(meerling: boolean, datumVermoedelijkeBevalling: IDateModel,
                               bevallen: boolean, datumBevalling: IDateModel, keuzeStartUitkering: KeuzeStartUitkeringEnum, datumUitkering: IDateModel) {
    const berekendeuitkeringsdatum = uitkeringsdatum(
        meerling,
        datumVermoedelijkeBevalling,
        bevallen,
        datumBevalling,
        keuzeStartUitkering,
        datumUitkering
    );
    return !!berekendeuitkeringsdatum ? berekendeuitkeringsdatum.getFullYear() : undefined;
}

/** Berekent de feitelijke uitkeringsdatum. Tzt API refactoren dat we geen gebruik meer maken van IDateModel  */
export function uitkeringsdatum(meerling: boolean, datumVermoedelijkeBevalling: IDateModel,
                                bevallen: boolean, datumBevalling: IDateModel, keuzeStartUitkering: KeuzeStartUitkeringEnum, datumUitkering: IDateModel) {
    const berekendeflexibiliseringsperiode = flexibiliseringsperiodeMetDatumBevalling(meerling, datumVermoedelijkeBevalling, bevallen, datumBevalling);
    if (bevallen &&
        !!datumBevalling && datumBevalling.date.day !== 0 && datumBevalling.date.month !== 0 && datumBevalling.date.year !== 0
        && datumBevalling.jsdate < berekendeflexibiliseringsperiode.min) {
        // Vroeggeboorte. Uitkering gaat 1 dag na bevalling in:
        const datum = addDays(datumBevalling.jsdate, 1);
        return datum;
    }
    switch (keuzeStartUitkering) {
        case KeuzeStartUitkeringEnum.Begin:
            return berekendeflexibiliseringsperiode.min;
        case KeuzeStartUitkeringEnum.Eind:
            return flexibiliseringsperiodeMetDatumBevalling(
                meerling, datumVermoedelijkeBevalling, bevallen, datumBevalling).max;
        case KeuzeStartUitkeringEnum.Anders:
            return !!datumUitkering && datumUitkering.date.day !== 0 && datumUitkering.date.month !== 0 && datumUitkering.date.year !== 0 ? datumUitkering.jsdate : undefined;
        default:
            throw new Error(`Parameter out of range: KeuzeStartUitkeringEnum`);
    }
}
