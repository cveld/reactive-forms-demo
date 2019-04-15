import * as StappenActions from './stappen.actions';
import { Stap } from '../../../shared/models/stap';
import { UwSituatieComponent } from '../../../stappenWazo/uw-situatie/uw-situatie.component';

export function stappenReducer(state: Stap[] = [
    {
      componentType : UwSituatieComponent,
      naamStap: 'Uw situatie'
    }
  ],                           action: StappenActions.Actions) {
  switch (action.type) {
    case StappenActions.ADD_STAP:
      return [...state, action.payload];
    case StappenActions.RESET_STAPPEN:
      return [];
    default:
      return state;
  }
}
