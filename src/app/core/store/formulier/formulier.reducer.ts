import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { createServerOperationReducer, createServerOperationResultReducer } from 'edv-ngrx-server-operation';
import { IFormulier } from './formulier.interface';
import { FormulierActions } from './formulier.actions';

/**
 * This reducer maintains the state for formulier.
 */
// tslint:disable-next-line:no-angle-bracket-type-assertion
export const formulierReducer = combineReducers(<ActionReducerMap<IFormulier>> {
    verstuurOperation: createServerOperationReducer(FormulierActions.VERSTUUR, FormulierActions.VERSTUUR_COMPLETE,
        FormulierActions.VERSTUUR_ERROR, FormulierActions.VERSTUUR_RESET),
});
