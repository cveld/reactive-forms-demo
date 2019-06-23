import { AdresType } from './adres-type.enum';
import { JaNeeEnum } from '../enums';
import { ResultaatType } from './ResultaatType';

//adresModel
export class AdresModel {
    postcode?: string;
    postcodebuitenland?: string;
    huisnummer?: string;
    huisnummerbuitenland?: string;
    huisnummertoevoeging?: string;
    straat?: string;
    woonplaats?: string;

    locatieOmschrijving?: string;
    regio?: string;
    land?: string;
    telefoonnummer?: string;
    telefoonnummerbuitenland?: string;

    adresbuitenland?: JaNeeEnum;
    bekendadresgebruiken?: JaNeeEnum;
    resultaat?: ResultaatType;
}
