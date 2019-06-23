import {  HeelKalenderjaarZEZEnum, JaNeeEnum, IndicatieLoonheffingskortingEnum } from '../enums';
import { IDateModel } from '../../lib/date-picker/interfaces';
import { SituatieInkomstenEnum } from '../enums/situatieinkomsten.enum';

export class WerkEnInkomenModel {
    // tslint:disable-next-line:max-line-length
    // KvKNummer, kvknummer, num(8)	IndicatieUrencriteriumZEZ, radio	DatumStartWerk, datum	HeelKalenderjaarZEZ,  radio, enum: Ja, NeeZelfstandig, NeeAO, NeeToelichting	ToelichtingHeelKalenderjaarZEZ, multiline (256)	IndicatieAangifteIB1, radio, enum: ja, nee	BedragInkomstenIB1, bedrag	IndicatieAangifteIB2, radio, enum: ja, nee	BedragInkomstenIB2, bedrag	SchattingInkomsten, bedrag
    public situatieInkomsten: SituatieInkomstenEnum;
    public kvknummer: string;
    public indicatieUrencriteriumZEZ: JaNeeEnum;
    public datumStartWerk: IDateModel;
    public heelKalenderjaarZEZ: HeelKalenderjaarZEZEnum;
    public toelichtingHeelKalenderjaarZEZ: string;
    public indicatieAangifteIB1: JaNeeEnum;
    public bedragInkomstenIB1: string;
    public indicatieAangifteIB2: JaNeeEnum;
    public bedragInkomstenIB2: string;
    public schattingInkomsten: string;
}
