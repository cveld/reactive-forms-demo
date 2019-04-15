import { Action } from '@ngrx/store';
import { Stap } from '../../../shared/models';

export const CHANGE_STAP = '[STAP] Change';
export const VOLGENDE = '[STAP] Volgende';

export class ChangeStap implements Action {
  readonly type = CHANGE_STAP;
  constructor(public payload: number) {}
}

export class VolgendeStap implements Action {
  readonly type = VOLGENDE;
  constructor() {}
}


export type Actions = ChangeStap | VolgendeStap;
