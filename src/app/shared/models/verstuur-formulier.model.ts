import { UwGegevensModel } from './uw-gegevens-model';
import { UwSituatieModel } from '.';
import { WerkEnInkomenModel } from './werk-en-inkomen-model';
import { BetaalwijzeModel } from './betaalwijze-model';
import { AdresModel } from './adres-model';

/** Defines the properties used when sending the formulier */
export class VerstuurFormulierModel {
    /** Content */
    public uwGegevens: UwGegevensModel;
    public uwSituatie: UwSituatieModel;
    public werkEnInkomen?: WerkEnInkomenModel;
    public betaalwijze?: BetaalwijzeModel;
}

