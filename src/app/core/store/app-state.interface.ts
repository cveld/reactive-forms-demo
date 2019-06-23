import { createSelector } from '@ngrx/store';
import { WWSituatieEnum, JaNeeEnum, StappenVariantEnum, WWofZelfstandigEnum } from 'src/app/shared/enums';
import { IFormulier } from './formulier/formulier.interface';
import * as domain from 'src/app/shared/helper/domain';
import { UwSituatieModel, UwGegevensModel, WerkEnInkomenModel, BetaalwijzeModel, VerstuurFormulierModel } from 'src/app/shared/models';

/** Root state shape */
export interface IAppState {
    formulier: IFormulier;
    actieveStap: number;
    uwsituatie: UwSituatieModel;
    uwgegevens: UwGegevensModel;
    werkEnInkomen: WerkEnInkomenModel;
    betaalwijze: BetaalwijzeModel;
}

// export const selectStappen = (state: IAppState) => state.stappen;
export const selectActieveStapIndex = (state: IAppState) => state.actieveStap;

export const selectUwSituatie = (state: IAppState) => {
    return state.uwsituatie;
};

export const selectUwGegevens = (state: IAppState) => {
    return state.uwgegevens;
};

export const selectFormulier = (state: IAppState) => state.formulier;

export const selectStappenvariant = createSelector(
    selectUwSituatie, (uwSituatie) => {
        if (!uwSituatie) {
            return undefined;
        }
        // deze selector moet afleiden uit de ingevulde waarden van de uwSituatie stap welke van de twee flows acties is:
        if (uwSituatie.wwsituatie === WWSituatieEnum.geen) {
            return StappenVariantEnum.zelfstandige;
        } else {
            if (uwSituatie.zelfstandige === JaNeeEnum.nee) {
                return StappenVariantEnum.ww;
            }
            if (uwSituatie.wwofzelfstandig !== WWofZelfstandigEnum.zelfstandig) {
                return StappenVariantEnum.ww;
            }
            return StappenVariantEnum.zelfstandige;
        }
    }
);

export const selectUitkeringsjaar = createSelector(
    selectUwSituatie, selectUwGegevens, (uwSituatie, uwGegevens) => {
        const berekenduitkeringsjaar = domain.uitkeringsjaar(
            uwSituatie.meerling === JaNeeEnum.ja,
            uwGegevens.datumVermoedelijkeBevalling,
            uwGegevens.bevallen === JaNeeEnum.ja,
            uwGegevens.datumBevalling,
            uwGegevens.keuzeStartUitkering,
            uwGegevens.datumUitkering);
        return berekenduitkeringsjaar;
    }
);

