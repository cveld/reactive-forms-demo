import { Action } from '@ngrx/store';
import { WerkEnInkomenModel } from 'src/app/shared/models/werk-en-inkomen-model';


export const SAVE = '[WERKENINKOMEN] Save';
export class SaveWerkEnInkomen implements Action {
    readonly type = SAVE;

    constructor(public payload: WerkEnInkomenModel) {

    }
}

export type Actions = SaveWerkEnInkomen;
