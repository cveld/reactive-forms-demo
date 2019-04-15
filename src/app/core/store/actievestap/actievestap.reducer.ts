import * as ActieveStappenActions from './actievestap.actions';
import { Stap } from '../../../shared/models/stap';

// const initialState: Stap = {
//   naamStap: '',
//   cmSIDStap: null,
//   indActieveStap: true,
//   volgnrStap: 1
// };

export function actieveStapReducer(state: number = 0, action: ActieveStappenActions.Actions): number {
    switch (action.type) {
      case ActieveStappenActions.CHANGE_STAP:
        return changeActieveStap(state, action);
      case ActieveStappenActions.VOLGENDE:
        return state + 1;
    default:
      return state;
  }
}

function changeActieveStap(state: number, action: ActieveStappenActions.ChangeStap): number {
  // state.indActieveStap = false;
  // action.payload.indActieveStap = true;

  return action.payload;
}
