import { WerkEnInkomenModel } from 'src/app/shared/models/werk-en-inkomen-model';
import * as WerkEnInkomenActions from './werk-en-inkomen.actions';

export function werkeninkomenReducer(state: WerkEnInkomenModel, action: WerkEnInkomenActions.Actions) {
    switch (action.type) {
        case WerkEnInkomenActions.SAVE:
            return action.payload;
        default:
            return state;
    }
}
