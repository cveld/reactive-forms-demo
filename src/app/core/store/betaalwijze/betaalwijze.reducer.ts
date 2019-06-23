import * as BetaalwijzeActions from './betaalwijze.actions';
import { BetaalwijzeModel } from 'src/app/shared/models/betaalwijze-model';

export function betaalwijzeReducer(state: BetaalwijzeModel, action: BetaalwijzeActions.Actions) {
    switch (action.type) {
        case BetaalwijzeActions.SAVE:
            return action.payload;
        default:
            return state;
    }
}
