import { UwSituatieModel } from '../../../shared/models/uw-situatie-model';
import * as UwSituatieActions from './uw-situatie.actions';

export function uwsituatieReducer(state: UwSituatieModel, action: UwSituatieActions.Actions) {
    switch (action.type) {
        case UwSituatieActions.SAVE:
            return action.payload;
        default:
            return state;
    }
}
