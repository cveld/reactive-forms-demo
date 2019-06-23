import { IndicatieLoonheffingskortingEnum, JaNeeEnum, SoortRekeningnummerEnum } from '../enums';

export class BetaalwijzeModel {
// tslint:disable-next-line:max-line-length
// IndicatieLoonheffingskorting, radio, enum: Ja, NeeAndereInkomsten, NeeBijAangifte	IndicatieVrijwilligeZW, radio, enum: ja nee	SoortRekeningnummer, radio, enum: Nederland, Buitenland, Uitzendbureau	IBAN, IBAN	VERVALT	VERVALT	VERVALT	IBAN, IBAN	BIC, BIC	BankNaam tekst 200	BankPlaats, tekst 80	VERVALT	VERVALT	Loonheffingennummer, AN12	UitzendbureauNaam	UitzendbureauStraat	UitzendbureauNummer	UitzendbureauToevoeging	UitzendbureauPostcode	UitzendbureauPlaats	IBAN	Intentieverklaring
    public indicatieLoonheffingskorting: IndicatieLoonheffingskortingEnum;
    public indicatieVrijwilligeZW: JaNeeEnum;
    public soortRekeningnummer: SoortRekeningnummerEnum;
    public IBAN: string;
    public BIC: string;
    public bankNaam: string;
    public bankPlaats: string;
    public loonheffingennummer: string;
    public uitzendbureauNaam: string;
    public intentieverklaring: boolean;
}
