import { createSelector } from '@ngrx/store';
import { IServerOperation, IServerOperationResult } from 'edv-ngrx-server-operation';
import { selectFormulier } from '../app-state.interface';

/** Cv state shape */
export interface IFormulier {
    verstuurOperation: IServerOperation;
}

/** Selector for the Verstuur operation  */
export const selectVerstuurOperation = createSelector(
    selectFormulier,
    s => (s ? s.verstuurOperation : undefined)
  );

  /** selector fot the verstuur update operation error */
export const selectVerstuurOperationError = createSelector(
    selectVerstuurOperation,
    operation => (operation && operation.error ? operation.error : undefined)
  );

  /** Selector for the Verstuur error state. */
export const selectVerstuurValidationError = createSelector(
    selectVerstuurOperationError,
    error => (error && error.isValidationError ? error.httpError : undefined)
  );
