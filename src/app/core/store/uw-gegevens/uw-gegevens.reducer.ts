import * as UwGegevensActions from './uw-gegevens.actions';
import { UwGegevensModel } from '../../../shared/models/uw-gegevens-model';

export function uwgegevensReducer(state: UwGegevensModel, action: UwGegevensActions.Actions) {
    switch (action.type) {
        case UwGegevensActions.SAVE:
            return action.payload;
        default:
            return state;
    }
}
