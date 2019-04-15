import { Action } from '@ngrx/store';
import { UwGegevens } from '../../../shared/models/uw-gegevens';


export const SAVE = '[UWGEGEVENS] Save';
export class SaveUwGegevens implements Action {
    readonly type = SAVE;

    constructor(public payload: UwGegevens) {

    }
}

export type Actions = SaveUwGegevens;
