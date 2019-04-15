import { Action } from '@ngrx/store';
import { Stap } from '../../../shared/models/stap';

export const DEFINIEER_STAPPEN = '[STAPPEN] Definieer';
export const ADD_STAP = '[STAPPEN] Add';
export const RESET_STAPPEN = '[STAPPEN] Reset';

export class AddStap implements Action {
  readonly type = ADD_STAP;

  constructor(public payload: Stap) {}
}

export class ResetStappen implements Action {
  readonly type = RESET_STAPPEN;
  constructor() {}
}

export class DefinieerStappen implements Action {
  readonly type = DEFINIEER_STAPPEN;
  constructor(public payload: Array<Stap>) {}
}


export type Actions = AddStap | ResetStappen | DefinieerStappen;
