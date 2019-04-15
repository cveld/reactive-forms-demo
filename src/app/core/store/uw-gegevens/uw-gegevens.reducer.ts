import * as UwGegevensActions from './uw-gegevens.actions';
import { UwGegevens } from 'src/app/shared/models/uw-gegevens';

export function uwgegevensReducer(state: UwGegevens, action: UwGegevensActions.Actions) {
    switch (action.type) {
        case UwGegevensActions.SAVE:
            return action.payload;
        default:
            return state;
    }
}
