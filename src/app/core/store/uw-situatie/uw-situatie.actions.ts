import { Action } from '@ngrx/store';
import { UwSituatieModel } from 'src/app/shared/models/uw-situatie';


export const SAVE = '[UWSITUATIE] Save';
export class SaveUwSituatie implements Action {
    readonly type = SAVE;

    constructor(public payload: UwSituatieModel) {

    }
}

export type Actions = SaveUwSituatie;
