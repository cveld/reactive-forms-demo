import { Action } from '@ngrx/store';
import { UwGegevensModel } from '../../../shared/models/uw-gegevens-model';


export const SAVE = '[UWGEGEVENS] Save';
export class SaveUwGegevens implements Action {
    readonly type = SAVE;

    constructor(public payload: UwGegevensModel) {

    }
}

export type Actions = SaveUwGegevens;
