import { Action } from '@ngrx/store';
import { BetaalwijzeModel } from 'src/app/shared/models/betaalwijze-model';

export const SAVE = '[BETAALWIJZE] Save';
export class SaveBetaalwijze implements Action {
    readonly type = SAVE;

    constructor(public payload: BetaalwijzeModel) {

    }
}

export type Actions = SaveBetaalwijze;
