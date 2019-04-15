import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { stappenReducer } from './stappen/stappen.reducer';
import { actieveStapReducer } from './actievestap/actievestap.reducer';
import { IAppState } from './app-state.interface';
import { uwsituatieReducer } from './uw-situatie/uw-situatie.reducer';
import { uwgegevensReducer } from './uw-gegevens/uw-gegevens.reducer';
import { createServerOperationResultReducer } from 'edv-ngrx-server-operation';
import { IResourceDictionary } from '../../shared/models/resources-dictionary';
import { ResourcesActions } from './resources/resources.actions';


export const AppStateReducer: ActionReducerMap<IAppState> = {
    actieveStap: actieveStapReducer,
    uwsituatie: uwsituatieReducer,
    resources: createServerOperationResultReducer<IResourceDictionary>(
        ResourcesActions.LOAD,
        ResourcesActions.LOAD_COMPLETE,
        ResourcesActions.LOAD_ERROR
      ),
    uwgegevens: uwgegevensReducer
};

/**
 * Injection token for root reducer dependency resolution. Needed for AOT to work.
 */
export const AppStateReducerToken = new InjectionToken<ActionReducerMap<IAppState>>('Registered Reducers');

/**
 * Provider for reducers, needed for AOT in combination with reducerToken.
 */
export const AppStateReducerProvider = { provide: AppStateReducerToken, useValue: AppStateReducer };
