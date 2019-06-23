import { JaNeeEnum, StappenVariantEnum } from '../enums';
import { IDate, IDateModel } from '../../lib/date-picker/interfaces';
import { AdresModel } from './adres-model';
import { KeuzeStartUitkeringEnum } from '../enums/keuzeStartUitkering.enum';
import { DatumValidators } from '../forms';
import * as domain from 'src/app/shared/helper/domain';

/** Model voor uw-gegevens stap */
export class UwGegevensModel {
    meerling?: boolean;
    stappenVariant?: StappenVariantEnum;
    datumVermoedelijkeBevalling?: IDateModel;
    datumBevalling?: IDateModel;
    kindOverleden?: boolean;
    bevallen?: JaNeeEnum;
    keuzeStartUitkering?: KeuzeStartUitkeringEnum;
    datumUitkering?: IDateModel;
    intentieverklaring?: string;
    adres?: AdresModel;

    public static keuzeStartUitkeringVanToepassing(input: UwGegevensModel): boolean {
        return DatumValidators.valideIDateModel(input.datumVermoedelijkeBevalling)
            && (input.bevallen === JaNeeEnum.nee || (input.bevallen === JaNeeEnum.ja && input.datumBevalling !== null
            && !domain.vroeggeboorte(input.meerling, input.datumVermoedelijkeBevalling, input.datumBevalling)));
    }

    public static datumBevallingVanToepassing(input: UwGegevensModel): boolean {
        return input.bevallen === JaNeeEnum.ja;
    }

    public static kindOverledenVanToepassing(input: UwGegevensModel): boolean {
        return input.bevallen === JaNeeEnum.ja;
    }

    public static datumUitkeringVanToepassing(input: UwGegevensModel): boolean {
        return UwGegevensModel.keuzeStartUitkeringVanToepassing(input) && input.keuzeStartUitkering === KeuzeStartUitkeringEnum.Anders;
    }

    /// Ten behoeve van versturen formulier. webapi bevragen we met beperkte informatie
    public static normaliseer(input: UwGegevensModel): UwGegevensModel {
        return {
            meerling: input.meerling,
            stappenVariant: input.stappenVariant,
            datumVermoedelijkeBevalling: input.datumVermoedelijkeBevalling,
            bevallen: input.bevallen,
            datumBevalling: UwGegevensModel.datumBevallingVanToepassing(input) ? input.datumBevalling : undefined,
            kindOverleden: UwGegevensModel.kindOverledenVanToepassing(input) ? input.kindOverleden : undefined,
            keuzeStartUitkering: UwGegevensModel.keuzeStartUitkeringVanToepassing(input) ? input.keuzeStartUitkering : undefined,
            datumUitkering: UwGegevensModel.datumUitkeringVanToepassing(input) ? input.datumUitkering : undefined,
            intentieverklaring: input.intentieverklaring,
            adres: input.adres
        };
    }
}
