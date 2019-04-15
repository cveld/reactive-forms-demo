import { selectActieveStapIndex, selectStappenvariant } from './app-state.interface';
import { UwSituatieComponent } from 'src/app/stappenWazo/uw-situatie/uw-situatie.component';
import { StappenVariantEnum } from 'src/app/shared/enums';
import { UwGegevensComponent } from 'src/app/stappenWazo/uw-gegevens/uw-gegevens.component';
import { createSelector } from '@ngrx/store';
import { WerkEnInkomenComponent } from 'src/app/stappenWazo/werk-en-inkomen/werk-en-inkomen.component';

// https://ngrx.io/guide/store/selectors#using-selectors-for-multiple-pieces-of-state
export const selectStappen = createSelector(
    selectActieveStapIndex, selectStappenvariant, (actieveStapIndex, stappenVariant) => {
        if (actieveStapIndex === 0) {
            return [{
                componentType : UwSituatieComponent,
                naamStap: 'Uw situatie'
              }];
        } else {
            if (stappenVariant === StappenVariantEnum.ww) {
                return [
                    {
                        componentType: UwSituatieComponent,
                        naamStap: 'Uw situatie'
                    },
                    {
                        componentType: UwGegevensComponent,
                        naamStap: 'Uw gegevens'
                    }
                ];
            }
            return [
                {
                    componentType: UwSituatieComponent,
                    naamStap: 'Uw situatie'
                },
                {
                    componentType: UwGegevensComponent,
                    naamStap: 'Uw gegevens'
                },
                {
                    componentType: WerkEnInkomenComponent,
                    naamStap: 'Werk en inkomen'
                },
                {
                    componentType: UwGegevensComponent,
                    naamStap: 'Betaalwijze'
                }
            ];
        }
    }
);

export const selectActieveStap = createSelector(
    selectStappen, selectActieveStapIndex, (stappen, index) =>  {
        console.log(stappen, index);
        return {
            stappen,
            actieveStap: index
        };
    }
);

