import { UwSituatieModel } from '../../shared/models/uw-situatie';
import { createSelector } from '@ngrx/store';
import { WWSituatieEnum, JaNeeEnum, StappenVariantEnum, WWofZelfstandigEnum } from '../../shared/enums';
import { UwGegevens } from '../../shared/models/uw-gegevens';
import { UwGegevensComponent } from '../../stappenWazo/uw-gegevens/uw-gegevens.component';
import { IResourceDictionary } from '../../shared/models/resources-dictionary';

/** Root state shape */
export interface IAppState {
    // stappen: Stap[];
    actieveStap: number;
    uwsituatie: UwSituatieModel;
    uwgegevens: UwGegevens;
}

// export const selectStappen = (state: IAppState) => state.stappen;
export const selectActieveStapIndex = (state: IAppState) => state.actieveStap;

export const selectUwSituatie = (state: IAppState) => {
    return state.uwsituatie;
};

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







