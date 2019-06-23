import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, delay, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../app-state.interface';
import {  FormulierActions } from './formulier.actions';
import { VersturenService } from '../../../shared/services/versturen.service';
import { VerstuurFormulierModel } from 'src/app/shared/models/verstuur-formulier.model';
import { UwGegevensModel } from 'src/app/shared';

@Injectable()
export class FormulierEffects {
  constructor(private readonly versturenService: VersturenService, private readonly store: Store<IAppState>, private readonly actions$: Actions) {}

  /**
   * Effect to send a form
   */
  @Effect()
  verstuur$ = this.actions$.pipe(
    ofType<FormulierActions.Verstuur>(FormulierActions.VERSTUUR),
    withLatestFrom(this.store),
    switchMap(([action, store]) => {
        // action.payload.data
        const verstuurFormulier: VerstuurFormulierModel = {
            uwSituatie: store.uwsituatie,
            uwGegevens: UwGegevensModel.normaliseer(store.uwgegevens),
            werkEnInkomen: store.werkEnInkomen,
            betaalwijze: store.betaalwijze
        };
        // TO DO: normalisering van de invoer. nette webapi call



        return this.versturenService.verstuurFormulier(verstuurFormulier).pipe(
            map(() => new FormulierActions.VerstuurComplete() ),
            catchError(err => of(new FormulierActions.VerstuurError(err)))
        );
      }
    )
  );
}
