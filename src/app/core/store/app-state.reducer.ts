import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { stappenReducer } from './stappen/stappen.reducer';
import { actieveStapReducer } from './actievestap/actievestap.reducer';
import { IAppState } from './app-state.interface';
import { uwsituatieReducer } from './uw-situatie/uw-situatie.reducer';
import { uwgegevensReducer } from './uw-gegevens/uw-gegevens.reducer';
import { createServerOperationResultReducer } from 'edv-ngrx-server-operation';
import { IResourceDictionary } from '../../shared/models/resources-dictionary';
import { formulierReducer } from './formulier/formulier.reducer';
import { werkeninkomenReducer } from './werk-en-inkomen/werk-en-inkomen.reducer';
import { betaalwijzeReducer } from './betaalwijze/betaalwijze.reducer';

export const AppStateReducer: ActionReducerMap<IAppState> = {
    formulier: formulierReducer,
    actieveStap: actieveStapReducer,
    uwsituatie: uwsituatieReducer,
    uwgegevens: uwgegevensReducer,
    werkEnInkomen: werkeninkomenReducer,
    betaalwijze: betaalwijzeReducer
};

/**
 * Injection token for root reducer dependency resolution. Needed for AOT to work.
 */
export const AppStateReducerToken = new InjectionToken<ActionReducerMap<IAppState>>('Registered Reducers');

/**
 * Provider for reducers, needed for AOT in combination with reducerToken.
 */
export const AppStateReducerProvider = { provide: AppStateReducerToken, useValue: AppStateReducer };
